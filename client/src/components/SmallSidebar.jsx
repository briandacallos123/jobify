import React from 'react'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { useDashboardContext } from '../pages/DashboardLayout'
import { FaTimes } from 'react-icons/fa'
import Logo from './Logo'
import links from '../utils/links'
import Navlinks from './NavLinks'

const SmallSidebar = () => {
  const {showSidebar, toggleSidebar} = useDashboardContext()
  
  return (
    <Wrapper>
        <div className={`sidebar-container ${showSidebar && 'show-sidebar'}`}>
          <div className="content">
            <button className="close-btn" onClick={toggleSidebar}>
              <FaTimes/>
            </button>
            <header>
              <Logo/>
            </header>
            <Navlinks/>
          </div>
        </div>
    </Wrapper>
  )
}

export default SmallSidebar