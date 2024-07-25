import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import Wrapper from '../assets/wrappers/ErrorPage';
import img from '../assets/images/not-found.svg';

const Error = () => {
    const err = useRouteError();
    
    console.log(err)
    if(err.status === 404){
        return <Wrapper>
            <div>
                <img src={img} alt="not found" />
                <h3>Ohh! page not found</h3>
                <Link to="/dashboard"> back home</Link>
            </div>
        </Wrapper>
    }

    return (
       <Wrapper>
        <div>
            <h3>Something went wrong</h3>
        </div>
       </Wrapper>
    )
}

export default Error