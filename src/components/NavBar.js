import React from 'react'
import { button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {auth} from '../firebase'
import {useHistory} from 'react-router-dom'
export default function NavBar({user}) {


    const history = useHistory()
    return (
        <>
            <nav className="navbar navbar-expand-lg   navbar-dark bg-primary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand">TODOs</Link>
                    <div className="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
                        <ul className="navbar-nav text-right">

                            {
                                user?
                                 <button type="button" className="btn btn-danger"
                                 onClick={()=>{auth.signOut()
                                 history.push('/login')}}>Logout</button>
                                :
                                    <>
                                <li className="nav-item active">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/signup">Signup</Link>
                            </li>
                            </>

                            }
                    


                           
                        </ul>
                        
                    </div>

                </div>
            </nav>



        </>

    )
}
