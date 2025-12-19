export function signUp(email, password) {
  alert(`Attempting to create user: ${email} with the password: ${password}`);
  return fetch("/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(res => res.json());
}

export function login(email, password) {
  alert(`Attempting to login as user: ${email}`);
  return fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(res => res.json());
}

