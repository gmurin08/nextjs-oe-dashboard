import  Link  from 'next/link'
import './footer.css'
export default function Footer() {
  return (
  <div className='outer'>
    <div className='top'>
    <div className="link-tbl-container">
      <div className="link-tbl">
        <div className="link-heading">
        <div className='link-tbl-title'>About</div>
          <div className='footer-link'>
          <Link href={'#'}>Home</Link>
          </div>
          <div className='footer-link'>
          <Link href={'#'}>Contact</Link></div>
        </div>
      </div>
      <div className="link-tbl">
        <div className="link-heading">
          <div className='link-tbl-title'>Contact</div>
          <div className='footer-link'>
          <Link href={'#'}>(412)968-9750</Link>
          </div>
          <div className='footer-link'>
          <Link href={'#'}>contact@oe66.com</Link></div>
        </div>
      </div>
    </div>
    </div>
    <div className="bottom">
      <div className="left">
        &copy; Operating Engineers Local 66 Combined Funds, Inc.
      </div>
      <div className="right">

      </div>
    </div>
  </div>
  )
}