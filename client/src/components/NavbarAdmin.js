import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import "../styles.scss";
// import logo from "../GandaLogo.jpg"

class NavbarAdmin extends Component {
    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push('/')
    }

    render() {
        if(localStorage.usertoken){
            return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
                    <button className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbar1"
                            aria-controls="navbar1"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className="collapse navbar-collapse justify-content-md-center" id="navbar1">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/conferences" className="nav-link">
                                    Conferences
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/mathematicians" className="nav-link">
                                    Members
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/universities" className="nav-link">
                                    Universities
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/sponsors" className="nav-link">
                                    Sponsors
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/userarea" className="nav-link">
                                    User Area
                                </Link>
                            </li>
                        </ul>

                    </div>
                </nav>
            )
        }
        return null;
    }
}

export default withRouter(NavbarAdmin)
