import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './Navbar.css'

const Navbar = () => {

  const {username,dispatch}= useContext(AuthContext)

  const HandleClick = ()=>{
    dispatch({type:"LOGOUT"})
  }
  return (
    <div className="navbar">
        <div className="nav">
            <Link to="/" style={{textDecoration:"none"}}>
            <div className="left">
                Booking.com
            </div>
            </Link>
            <div className="right">
                <div><span>INR</span></div>
               <div> <img src="https://cf.bstatic.com/static/img/flags/new/48-squared/in/20aa535a5d3c505dd02fea275ed1a36c0fb1fe08.png" alt="" /></div>
                <div>
                <i class="fa-regular fa-circle-question"></i>
                </div>

                <div className="box">
                    List Your Property
                </div>

                {username ? (<> {username} <div className="button">
                <button onClick={HandleClick}>Logout</button></div> </>) :( <div className="button">
                    <Link className="button" to={'/login'}><button>Sign in</button></Link>
                    <button>Sign Up</button>
                </div>)}
            </div>
        </div>
    </div>
  )
}

export default Navbar