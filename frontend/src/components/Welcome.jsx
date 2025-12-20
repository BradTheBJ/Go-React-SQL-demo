import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import '../index.css';

export default function WelcomeScreen() {
    return (
        <div>
            <h1>Welcome to my fullstack web application demo.</h1>
            <p>Here I will give you a brief overview of how I built this application with React, Golang, and SQLite3.</p>
            <p>Golang: A powerful backend language used for building scalable and efficient web services.
               I personally enjoy Golang for its simplicity, C like syntax, and excellent performance.</p>
        </div>
    )
}