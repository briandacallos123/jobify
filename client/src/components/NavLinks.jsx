import React from 'react'
import { useDashboardContext } from '../pages/DashboardLayout'
import links from '../utils/links'
import { NavLink } from 'react-router-dom'

const Navlinks = ({isBigSidebar}) => {
    const {toggleSidebar, user} = useDashboardContext()

    return (
        <div className="nav-links">
            {links?.map((item) => {
                const { text, path, icon } = item;
                const {role} = user;
                if(path === 'admin' && role !== 'admin') return null;
                return <NavLink onClick={!isBigSidebar && toggleSidebar} to={path} className="nav-link" key={text}>
                    <span className="icon">
                        {icon}

                    </span>
                    {text}
                </NavLink>
            })}
        </div>
    )
}

export default Navlinks