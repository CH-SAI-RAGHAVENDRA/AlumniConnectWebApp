import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Explore from './components/Explore'
import Messaging from './components/Messaging'
import Saved from './components/Saved'
import JobPostings from './components/JobPostings'
import MyNetwork from './components/MyNetwork'
import Settings from './components/Settings'
import NavBar from './components/NavBar'
import Notifications from './components/Notifications'
const router=createBrowserRouter([
  {
    path:'/',
    element:<NavBar/>,
    children:[
      {
        path:'',
        element:<Home/>
      },
      {
        path:'explore',
        element:<Explore/>
      },
      {
        path:'notifications',
        element:<Notifications/>
      },
      {
        path:'messaging',
        element:<Messaging/>
      },
      {
        path:'saved',
        element:<Saved/>
      },
      {
        path:'job-postings',
        element:<JobPostings/>
      },
      {
        path:'my-network',
        element:<MyNetwork/>
      },
      {
        path:'settings',
        element:<Settings/>
      }
    ]
  }
])
const App = () => {

  return (
    <RouterProvider router={router}/>
  )
}

export default App