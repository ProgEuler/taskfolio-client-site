import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './index.css'
import { Outlet } from 'react-router'

export default function Root() {
  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}
