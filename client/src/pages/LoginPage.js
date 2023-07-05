import { useContext, useState } from "react";
import { Navigate} from "react-router-dom"
import { UserContext } from "../UserContext";

export default function Loginpage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false)
  const {setUserInfo} = useContext(UserContext)

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch("https://mern-2-api.onrender.com/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "content-type": "application/json" },
      credentials: 'include',
    });
    if (response.ok) {
        response.json().then(userInfo => {
            setUserInfo(userInfo)
            setRedirect(true)
            alert('Login successful')
        })
       
    } else {
        alert('wrong credential')
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button>Login</button>
    </form>
  );
}
