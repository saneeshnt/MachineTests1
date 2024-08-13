import React from 'react'
import {Route,Routes} from 'react-router-dom'
import UserLogin from '../Pages/UserLogin'
import UserAddUser from '../Pages/UserAddUser'

function UserRouter() {
  return (
    <div><Routes>
        <Route path='/' element={<UserLogin/>}/>
        <Route path='/add' element={<UserAddUser/>}/>
        </Routes></div>
  )
}

export default UserRouter