from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import User
from .schemas import RegisterRequest, TokenResponse
from .security import hash_password, verify_password, create_access_token, decode_token

router = APIRouter(prefix="/auth", tags=["auth"])

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
def register(data: RegisterRequest, db: Session = Depends(get_db)) -> dict:
    email = data.email.lower().strip()

    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    new_user = User(
        email=email,
        hashed_password=hash_password(data.password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "registered"}


@router.post("/login", response_model=TokenResponse)
def login(
    form: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
) -> TokenResponse:
    email = form.username.lower().strip()

    user = db.query(User).filter(User.email == email).first()

    if not user or not verify_password(form.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    token = create_access_token(subject=email)
    return TokenResponse(access_token=token)


@router.get("/me")
def me(email: str = Depends(get_current_user_email)) -> dict:
    return {"email": email}


