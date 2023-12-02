'use client'

import './login.css'
import member_icon from '../ui/img/worker.png'
import contractor_icon from '../ui/img/team.png'
import { useFormState, useformStatus } from 'react-dom'
import {authenticate } from '@app/lib/actions'
export default function Page() {

  const [state, dispatch] = useFormState(authenticate,undefined)
  return (<>
  <div className='login-container'>
   {/*Refactor greeting into component*/}
    <div className="greeting">
    </div>
    <div className="top-banner">
      <div className="top-banner-content">
        <h1>Login</h1>
        <p>Members and contractors log in to access your account.
        If you have difficulty logging in, please contace the funds office.</p>
      </div>
    </div>
    <div className="login-form-container">
        <div className="login-form-content">
          <form className="login-form" action={dispatch}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" value={formData.email}  onChange={handleFormChange} />
            
            <label htmlFor="pw">Password</label>
            <input id="password" name="password" type="password" value={formData.password} onChange={handleFormChange} />
            
            <button type='submit'>Login</button>
            <div className="link-container">
              <a href="#">Forgot Password?</a>
            </div>
            
          </form>
        </div>
    </div>
    <div className="rule-container">
      <div className='rule-1'></div>
    </div>
    <div className="create-btns">
      <div className="create-btns-content">
        <div className="create-heading">
          <i>First Time Logging In?</i>
        </div>
        <div className="btn-container">
          <button><img className="create-icon" src={member_icon} alt="" />Fund Members - Create an Account</button>
          <button><img className="create-icon" src={contractor_icon} alt="" />Contractors - Create an Accunt</button>
        </div>
      </div>
    </div>
  </div>
  </>)
}
