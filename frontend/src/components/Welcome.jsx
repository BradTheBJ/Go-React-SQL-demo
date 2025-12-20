import React from "react";
import '../index.css';

function RedirectToSignup() {
  const handleClick = () => {
    window.location.href = "/signup";
  };

  return (
    <button type="button" onClick={handleClick}>
      To access a very secret message. Click here and sign up.
    </button>
  );
}

export default function WelcomeScreen() {
  return (
    <div>
      <h1>Welcome to my fullstack web application demo.</h1>
      <br />
      <p>Here I will give you a brief overview of how I built this application with React, Golang, and SQLite3.</p>
      <br />
      <p>Golang: A powerful backend language used for building scalable and efficient web services.
        I personally enjoy Golang for its simplicity, C like syntax, and excellent performance.</p>
      <br />
      <p>React: A powerful JavaScript frontend framework. I chose it for how popular it is and the abundance of tutorials.</p>
      <br />
      <p>SQLite3: A lightweight SQL engine. I personally chose it because of how easy it is to set up with Golang.</p>
      <br />
      <RedirectToSignup />
    </div>
  );
}
