import React from 'react'
import { Outlet } from 'react-router-dom'

function UserLayout() {
  return (
    <>
      <h2>Contact history feedback management</h2>
      <div>
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default UserLayout