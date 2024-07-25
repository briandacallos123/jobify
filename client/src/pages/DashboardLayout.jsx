import React, { useContext, createContext, useState } from 'react'
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import { BigSidebar, Navbar, SmallSidebar } from '../components'
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';


const DashboardContext = createContext();

const checkDefaultTheme = () => {
    const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
    return isDarkTheme
}

export const loader = async() => {
    try {
        const {data} = await customFetch.get('/user/current-user');
     
        return data?.user
    } catch (error) {
        console.log(error)
        return error
        
    }
}
export const useDashboardContext = () => useContext(DashboardContext);

const DashboardLayout = () => {

    const user = useLoaderData();
    const [showSidebar, setShowSidebar] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
    const navigate = useNavigate()

    const toggleDarkTheme = () => {
        const darkTheme = !isDarkTheme
        setIsDarkTheme(darkTheme)
        localStorage.setItem('darkTheme',darkTheme)
        // document.body.classList.toggle('dark-theme', darkTheme)
    }

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }

    const logoutUser = async() => {
        try {
            await customFetch.get('/auth/logout');
            navigate('/')
            toast.success("logging out")

        } catch (error) {
            // console.log(error)
            toast.error("Something went wrong")
            
        }
    }

    return (
        <DashboardContext.Provider value={{user, showSidebar, isDarkTheme, toggleDarkTheme, toggleSidebar, logoutUser}}>
            <Wrapper>
                <main className="dashboard">
                    <SmallSidebar />
                    <BigSidebar />
                    <div>
                        <Navbar />
                        <div className="dashboard-page">
                            <Outlet context={{user}}/>

                        </div>
                    </div>
                </main>
            </Wrapper>
        </DashboardContext.Provider>
    )
}


export default DashboardLayout