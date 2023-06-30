import React from 'react'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import Notifications from './pages/Notifications'
import Messages from './pages/Messages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { auth } from './config/firebase'
import {useAuthState} from "react-firebase-hooks/auth";


const public_routers = [{
  path:"/signup",
  element: <SignUp/>
},
{
path:'/',
element:<Login/>
}]
const private_routers = [
{
  path:'/home',
  element:<Home/>
},
{
path:'/messages',
element:<Messages/>
},
{
path:'notifications',
element:<Notifications/>
}
]
const App = () => {
  const [user] = useAuthState(auth);

  const status = useSelector(state=>state.user.isLoggedIn);
  console.log(status);
  return (
    <div>
      <BrowserRouter>
      <Routes>
        {!user && public_routers.map((ele)=>{
          return <Route path={ele.path} element={ele.element}/>
        })}

        {user && 
        
        <>
        <Route path='home' element={<Home/>}/>
          <Route index element={<Home/>}/>
          <Route path='/notifications' element={<Notifications/>}/>
          <Route path='/messages' element = {<Messages/>}/>
        </>}
      
        
      </Routes>
      </BrowserRouter>
      
      {/* <SignUp/> */}
      {/* <Login/> */}
      {/* <Home/> */}
    </div>
  )
}

export default App