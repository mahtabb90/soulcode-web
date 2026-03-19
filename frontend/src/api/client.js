export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export async function getHealth() {
  const res = await fetch(`${API_BASE_URL}/health`);
  if (!res.ok) throw new Error("Health check failed");
  return res.json();
}
export async function login(email, password) {
  const body = new URLSearchParams();
  body.append("username", email);
  body.append("password", password);

  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const message = data?.detail || "Login failed";
    throw new Error(message);
  }

  return res.json();
}

export async function register(email, password) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const message = data?.detail || "Register failed";
    throw new Error(message);
  }

  return res.json(); // { message: "registered" }
}
export async function getMe() {
  const token = localStorage.getItem("soulcode_token");

  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json(); // { email }
}
function getToken() {
  return localStorage.getItem("soulcode_token");
}

export async function listEntries() {
  const res = await fetch(`${API_BASE_URL}/entries`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Failed to load entries");
  return res.json();
}

export async function createEntry(entry) {
  const res = await fetch(`${API_BASE_URL}/entries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(entry),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail || "Failed to create entry");
  }
  return res.json();
}
export async function getWeeklySummary() {
  const token = localStorage.getItem("soulcode_token");

  const res = await fetch(`${API_BASE_URL}/entries/summary/weekly`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to load summary");
  }

  return res.json();
}

export async function getEntry(id) {
  const res = await fetch(`${API_BASE_URL}/entries/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Failed to fetch entry");
  return res.json();
}

export async function updateEntry(id, entry) {
  const res = await fetch(`${API_BASE_URL}/entries/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(entry),
  });

  if (!res.ok) throw new Error("Failed to update entry");
  return res.json();
}

export async function deleteEntry(id) {
  const res = await fetch(`${API_BASE_URL}/entries/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete entry");
}

