from fastapi import APIRouter, HTTPException, status
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.security import OAuth2PasswordRequestForm
from .security import hash_password, verify_password, create_access_token, decode_token


from .schemas import RegisterRequest, LoginRequest, TokenResponse
from .security import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])

# TEMP in-memory user store (for MVP)
# Later we will replace with database.
_users: dict[str, str] = {}  # email -> hashed_password
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user_email(token: str = Depends(oauth2_scheme)) -> str:
    try:
        email = decode_token(token)
        return email
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )


@router.post("/register", status_code=201)
def register(data: RegisterRequest) -> dict:
    email = data.email.lower().strip()
    if email in _users:
        raise HTTPException(status_code=400, detail="User already exists")

    _users[email] = hash_password(data.password)
    return {"message": "registered"}


@router.post("/login", response_model=TokenResponse)
def login(form: OAuth2PasswordRequestForm = Depends()) -> TokenResponse:
    email = form.username.lower().strip()
    hashed = _users.get(email)

    if not hashed or not verify_password(form.password, hashed):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    token = create_access_token(subject=email)
    return TokenResponse(access_token=token)

@router.get("/me")
def me(email: str = Depends(get_current_user_email)) -> dict:
    return {"email": email}

