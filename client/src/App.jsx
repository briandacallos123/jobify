import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { RegisterAction } from './pages/Register'
import { LoginAction } from './pages/Login'
// compoentns
import { HomeLayout, Landing, Register, Login, DashboardLayout, Error, AddJob, Stats, AllJobs, Profile, Admin, EditJob, DeleteJob } from './pages'
import { toast, ToastContainer } from 'react-toastify'

// actions
import { action as JobAction } from './pages/AddJob'
import { action as EditJobAction } from './pages/EditJob'
import { action as DeleteAction } from './pages/DeleteJob'
import { action as ProfileAction} from './pages/Profile'

// loaders
import { loader as userLoader } from './pages/DashboardLayout'
import { loader as allJobsLoader } from './pages/AllJobs'
import { loader as EditJobLoader } from './pages/EditJob'
import { loader as AdminLoader } from './pages/Admin'

const route = createBrowserRouter([
  {
    path:"/",
    element:<HomeLayout/>,
    errorElement:<Error/>,
    children:[
      {
        index:true,
        element:<Landing/>
      },
      {
        path:"register",
        element:<Register/>,
        action:RegisterAction
      },
      {
        path:"login",
        element:<Login/>,
        action:LoginAction
      },
      {
        path:"dashboard",
        element:<DashboardLayout/>,
        loader:userLoader,
        children:[
          {
            index:true,
            element:<AddJob/>,
            action:JobAction
          },
          {
            path:"stats",
            element:<Stats/>  
          },
          {
            path:"all-jobs",
            element:<AllJobs/>,
            loader:allJobsLoader
          },
          {
            path:"profile",
            element:<Profile/>,
            action:ProfileAction
          },
          {
            path:"admin",
            element:<Admin/>,
            loader:AdminLoader
          },
          {
            path:"edit-job/:id",
            element:<EditJob/>,
            loader:EditJobLoader,
            action:EditJobAction
          },
          {
            path:"delete/:id",
            element:<DeleteJob/>,
            action:DeleteAction
          }
        ]
      },
    ]
  },
 
  
])

const App = () => {
  
  return <RouterProvider router={route}/> 
   
}

export default App