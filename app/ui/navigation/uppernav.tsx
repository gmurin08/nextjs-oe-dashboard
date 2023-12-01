import Link from 'next/link'
//import { auth,logout } from '../../Context/auth'
import './uppernav.css'
export default function UpperNav() {
  const auth = false
  const handleLogout = () =>{
  
  }

  return (
    <div className="primary-bar">
      <div className="primary-bar-links">
          <Link className="home-link" href={'/'}>Home</Link>
          <Link className="contact-link" href={'/contact'}>Contact</Link>
      </div>
      <div className="primary-bar-button">
      {auth?
        <button onClick={handleLogout} className='login-btn'>
          <div className="btn-inner">
          <div className='btn-text'>Logout</div>
          <img className="login-icon" src={'../img/login.png'} alt="" />
          </div>
        </button>
      :
      <Link href={"/login"}>
        <button className='login-btn'>
          <div className="btn-inner">
          <div className='btn-text'>Login</div>
          <img className="login-icon" src={'../img/login.png'} alt="" />
          </div>
        </button>
      </Link>
      }
      </div>
    </div>
  )
}