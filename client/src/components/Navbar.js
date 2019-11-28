import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import "../styles.scss";
import logo from "../GandaLogo.jpg"

class Navbar extends Component {
    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push('/')
    }


    render() {
        const loginRegLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        <div className="nav-all">Login</div>
                    </Link>
                </li>
                {/*<li className="nav-item">*/}
                {/*<Link to="/register" className="nav-link">*/}
                {/*Register*/}
                {/*</Link>*/}
                {/*</li>*/}
            </ul>
        )

        const userLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                        <div className="nav-all">User</div>
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                        <div className="nav-all">Logout</div>
                    </a>
                </li>
            </ul>
        )
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
                    <img src={logo} width="100" height="100" />
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/frontend-conferences-list" className="nav-link">
                                <div className="nav-all">Conferences</div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/frontend-mathematicians-list" className="nav-link">
                                <div className="nav-all">Members</div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">
                                <div className="nav-all">About</div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/sponsors" className="nav-link">
                                <div className="nav-all">Sponsors</div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact-us" className="nav-link">
                                <div className="nav-all">Contact Us</div>
                            </Link>
                        </li>
                    </ul>
                    { localStorage.usertoken ? userLink : loginRegLink }
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar)
