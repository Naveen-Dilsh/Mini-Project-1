import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <>
        <Link to="/signup">Register</Link>
        <Link to="/login">Login</Link>
    </>
  )
}

export default Homepage