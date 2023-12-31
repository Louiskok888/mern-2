import { useContext, useEffect,} from "react"
import {Link} from "react-router-dom"
import { UserContext } from "./UserContext"

export default function Headers() {
const {setUserInfo, userInfo} = useContext(UserContext)
  useEffect(() => {
     fetch('https://mern-2-api.onrender.com/profile',{
      credentials: 'include',
     }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo)
      })
     })
  }, [setUserInfo])

  function logout() {
    fetch('https://mern-2-api.onrender.com/logout', {
      credentials: 'include',
      method: 'POST',
    })
    setUserInfo (null)
  }

  const username = userInfo?.username
    return(
        <header>
        <Link to="/" className="logo">
          MyBlog
        </Link>
        <nav>
        {username && (
          <>
          <span className="username">Hello, {username}</span>
          <Link to="/create">Create new post</Link>
          <button onClick={logout}>Logout</button>
          </>
        )}
        {!username && (
          <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          </>
        )}
        </nav>
      </header>
    )
}

