/* eslint-disable no-undef */
// main component of this React application

import React, { Component } from 'react';
// keep UI in sync with the route URL
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


import Navbar from './components/Navbar'
import NavbarAdmin from './components/NavbarAdmin'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import MembersList from './components/MembersList'
import MembersEdit from './components/MembersEdit'
import MembersCreate from './components/MembersCreate'
import Profile from './components/Profile'
import Teresa from './components/Teresa'
import About from './components/About'
import Sponsors from './components/Sponsors'
import ContactUs from './components/ContactUs'
import ConferencesList from './components/ConferencesList'
import ConferencesEdit from './components/ConferencesEdit'
import ConferencesCreate from './components/ConferencesCreate'
import UniversitiesList from './components/UniversitiesList'
import UniversitiesEdit from './components/UniversitiesEdit'
import UniversitiesCreate from './components/UniversitiesCreate'
import MathematiciansList from './components/MathematiciansList'
import MathematiciansEdit from './components/MathematiciansEdit'
import MathematiciansCreate from './components/MathematiciansCreate'
import FrontEndConferencesList from "./components/FrontEndConferencesList";
import FrontEndMathematiciansList from "./components/FrontEndMathematiciansList";




class App extends Component {
  constructor(props) {
    super(props)
      this.handleLoggedIn = this.handleLoggedIn.bind(this);
      this.handleLoggedOut = this.handleLoggedOut.bind(this);
      this.state = { isLoggedIn : false}
  }


  handleLoggedIn(e) {
    e.preventDefault();
    this.setState({
        isLoggedIn : true
    });
  }

    handleLoggedOut(e) {
        e.preventDefault();
        this.setState({
            isLoggedIn : false
        });
    }


  render() {

    return (
      <Router>
        <div className="App">
            <Navbar/>
            <NavbarAdmin/>
          <div className="container">
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/members-create" component={MembersCreate} />
            <Route exact path="/members-edit/:id" component={MembersEdit} />
            <Route exact path="/members" component={MembersList} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/teresa" component={Teresa} />
            <Route exact path="/about" component={About} />
            <Route exact path="/sponsors" component={Sponsors} />
            <Route exact path="/contact-us" component={ContactUs} />
            <Route exact path="/conferences" component={ConferencesList} />
            <Route exact path="/conferences-edit/:id" component={ConferencesEdit} />
            <Route exact path="/conferences-create" component={ConferencesCreate} />
            <Route exact path="/universities" component={UniversitiesList} />
            <Route exact path="/universities-edit/:id" component={UniversitiesEdit} />
            <Route exact path="/universities-create" component={UniversitiesCreate} />
            <Route exact path="/mathematicians" component={MathematiciansList} />
            <Route exact path="/mathematicians-edit/:id" component={MathematiciansEdit} />
            <Route exact path="/mathematicians-create" component={MathematiciansCreate} />
            <Route exact path="/frontend-conferences-list" component={FrontEndConferencesList} />
            <Route exact path="/frontend-mathematicians-list" component={FrontEndMathematiciansList} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
