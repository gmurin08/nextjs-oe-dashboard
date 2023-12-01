import Link from 'next/link'
import Image from 'next/image'
import './lowernav.css'
import logo from '../img/iuoe66-logo.png'
export default function LowerNav() {
  return (<>
    <section className='secondary-bar'>
      <div className="logo">
        <Link href={"#"}>
          <Image 
            src={logo}
            height={90}  
            width={360}
            alt="IUOE Local 66 Logo"
          />
        </Link>
      </div>
      <div className='navlink-container'>
        <div className='navlinks'>
          <Link className="navlink" href={"/dashboard"}>Dashboard</Link> 
        </div>
        <div className='navlinks'>
          <Link className="navlink" href={"/dashboard/vault"}>My Vault</Link> 
        </div>
        <div className='navlinks'>
          <Link className="navlink" href={"/dashboard/statements"}>Welfare Statements</Link> 
        </div>
        <div className='navlinks'>
          <Link className="navlink" href={"/resources"}>Member Resources</Link> 
        </div>
      </div>
    </section>
    <div className='greeting-container'>
        <div className='greeting'>Welcome, Gino Murin</div>
    </div>
  </>)
}
