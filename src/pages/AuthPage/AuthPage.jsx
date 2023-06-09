import { useState } from "react";

import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LogInForm from '../../components/LoginForm/LogInForm'

function AuthPage({ setUser })
{
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="AuthPage">
      <h1>Auth Page</h1>

      <button onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? "Sign up" : "Sign in"}
      </button>

      {showLogin ? (
        <LogInForm setUser={setUser} />
      ) : (
        <SignUpForm setUser={setUser} />
      )}
    </div>
  );
}

export default AuthPage;
