import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { loginUser } from '../scripts/loginUser';
import { Navigate } from 'react-router-dom';

function Login() {

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  let accessToken = localStorage.getItem("access_token");

  if (code) loginUser(code);
  else if (!!accessToken) (<Navigate to="/loading" />);
  else window.location.replace("http://localhost:3000");

  return (
    <p>Logging in...</p>
  )
}

export default Login