export function signUp(email, password) {
  alert(`Attempting to create user: ${email} with the password: ${password}`);
  return fetch("/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then(res => res.json());
}

