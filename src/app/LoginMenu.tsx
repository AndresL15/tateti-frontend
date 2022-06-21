import React from "react"
import { NavLink } from "react-router-dom"
import "./Menu.css"

export default function LoginMenu() {
  return (
    <div>
      <NavLink to="/" className="menu_item btn btn-sm btn-link">Welcome</NavLink><br />
      <NavLink to="/login" className="menu_item btn btn-sm btn-link">Login</NavLink><br />
      <NavLink to="/register" className="menu_item btn btn-sm btn-link">Registrarse</NavLink><br />
    </div>
  )
}
