import React from 'react'
import Wrapper from '../assets/wrappers/LandingPage'
import main from '../assets/images/main.svg'
import logo from '../assets/images/logo.svg'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="jobify" className="logo" />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>Job <span>Tracking</span> App
          </h1>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis voluptatem amet ea, nisi, ratione consectetur rerum fuga eligendi incidunt expedita quae quisquam voluptatum. Voluptates ad porro aliquid quasi, hic laudantium alias debitis numquam necessitatibus iure ipsam non eos temporibus facilis? Nobis nemo, at nihil quia expedita nulla asperiores impedit possimus!</p>
          <Link to="/register" className="btn register-link">Register</Link>
          <Link to="/login" className="btn register-link">Login / Demo User</Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img"/>
      </div>
    </Wrapper>
  )
}

export default Landing