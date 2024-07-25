import React, {useEffect} from 'react'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import img from '../assets/images/logo.svg'
import { Link, Form, redirect } from 'react-router-dom'
import { FormRow } from '../components'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const RegisterAction = async({request}) =>{
  const formData = await request.formData();
  const data =  Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/register', data)
    toast.success("register successfully")
    return redirect('/login')
  } catch (error) {
    toast("Something went wrong")
    return error
  }

}

const Register = () => {


  return (
    <Wrapper>
      <Form method="post" className="form">
        <img src={img} alt="" />
        <h4>Register</h4>
        <FormRow name="name" type="text" />
        <FormRow name="lastName" type="text" labelText="last name" />
        <FormRow name="location" type="text" />
        <FormRow name="email" type="email" />
        <FormRow name="password" type="password" />
        <button type='submit' className="btn btn-block">submit</button>
        <p>Already a member?

          <Link to="/login" className='member-btn'>Login</Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Register