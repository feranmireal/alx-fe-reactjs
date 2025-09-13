import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#0b3d91',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 20px',
      color: 'white'
    }}>
      <div style={{ fontWeight: '700' }}>MyCompany</div>
      <div>
        <Link to="/" style={{ color: 'white', marginRight: 16, textDecoration: 'none' }}>Home</Link>
        <Link to="/about" style={{ color: 'white', marginRight: 16, textDecoration: 'none' }}>About</Link>
        <Link to="/services" style={{ color: 'white', marginRight: 16, textDecoration: 'none' }}>Services</Link>
        <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
      </div>
    </nav>
  )
}
