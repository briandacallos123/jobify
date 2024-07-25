import React from 'react'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import Logo from '../components/Logo'
import { FormRow } from '../components'
import { Form, Link, redirect } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { toast, ToastContainer, } from 'react-toastify'
// import {  toast } from 'react-toastify';
export const LoginAction = async({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

 try {
   await customFetch.post('/auth/login', data);
  toast.success("Login successfully");
  return redirect('/dashboard')
 } catch (error) {
  const {response} = error;
  toast.error(response?.data?.msg);
  return error
 }
  
}

const Login = () => {

  return (
    <Wrapper>
        <Form method="post" className="form">
            <Logo/>
            <h4>Login</h4>
            <FormRow type="email" name="email"/>
            <FormRow type="password" name="password"/>
            <button className="btn btn-block" type="submit">submit</button>
            <button className="btn btn-block" type="button">explore the app</button>
            <p>Not e member yet? <Link to="/register" className="member-btn">Register</Link></p>
        </Form>
    </Wrapper>
  )
}

export default Login