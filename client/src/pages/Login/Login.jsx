// Login.jsx

import { useState } from "react";
import LoginForm from "../../components/LoginForm.jsx";
import SignUpForm from "../../components/SignUpForm.jsx";
import { Button } from "../../styles.jsx";
import { Logo, Wrapper, Divider } from "./style.js";

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Wrapper>
      <Logo>TrackTrip</Logo>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <Divider />
          <p>
            Don't have an account? &nbsp;
            <Button color="secondary" onClick={() => setShowLogin(false)}>
              Sign Up
            </Button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm onLogin={onLogin} />
          <Divider />
          <p>
            Already have an account? &nbsp;
            <Button color="secondary" onClick={() => setShowLogin(true)}>
              Log In
            </Button>
          </p>
        </>
      )}
    </Wrapper>
  );
}


export default Login;
