export function redirectButton(url) {
  if (url === "http://localhost:8080/signup") {
    window.location.replace("http://localhost:8080/login");
  } else if (url === "http://localhost:8080/login") {
    window.location.replace("http://localhost:8080/signup");
  }
}



