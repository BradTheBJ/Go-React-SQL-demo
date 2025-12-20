export function signUp(email, password) {
  return fetch("/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(async (res) => {
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Signup failed");
    }
    return data;
  });
}

export function login(email, password) {
  return fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(async (res) => {
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Login failed");
    }
    return data;
  });
}

