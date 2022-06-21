import React from "react"
import { NavLink } from "react-router-dom"
import "./Menu.css"
import { logout } from "../user/userService"

export default function MainMenu() {
  const logoutApp = () => {
    void logout()
  }

  return (
    <div>
      <NavLink to="/room" className="menu_item btn btn-sm btn-link">Tateti</NavLink><br />
      <NavLink to="" onClick={logoutApp} className="menu_item btn btn-sm btn-link">Logout</NavLink><br />
    </div>
  )
}
