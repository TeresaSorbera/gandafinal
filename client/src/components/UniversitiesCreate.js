import React, { Component } from 'react'
import logo from "../GandaLogo.jpg";
// access the API the Axios library is offering
import axios from 'axios';

class UniversitiesCreate extends Component {

    constructor(props) {
        // call the parent's constructor
        super(props);

        // methods below must be bound to the this object otherwise the state object is inaccessible
        this.onCreateUniversitiesName = this.onCreateUniversitiesName.bind(this);
        this.onCreateUniversitiesCountry = this.onCreateUniversitiesCountry.bind(this);
        this.onCreateUniversitiesCity = this.onCreateUniversitiesCity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // set a state for this component
        this.state = {
            university_name: '',
            university_country: '',
            university_city: '',
        }
    }

    // methods will be used by form to update the state object with the values input by the user
    // methods take the event as a parameter

    onCreateUniversitiesName(e) {
        // update the component's state; take an object with the updated key/value pair
        this.setState({
            university_name: e.target.value
        });
    }

    onCreateUniversitiesCountry(e) {
        // update the component's state; take an object with the updated key/value pair
        this.setState({
            university_country: e.target.value
        });
    }
    onCreateUniversitiesCity(e) {
        // update the component's state; take an object with the updated key/value pair
        this.setState({
            university_city: e.target.value
        });
    }

    // method to handle the submit event of the form
    onSubmit(e) {
        /* call the method preventDefault to stop the browser's default submit behaviour
        when a form is submitted */
        e.preventDefault();

        // submit logic
        // access the endpoint to submit the data (when backend is built)
        console.log(`Form submitted:`);
        console.log(`Name: ${this.state.university_name}`)
        console.log(`Country: ${this.state.university_country}`)
        console.log(`City: ${this.state.university_city}`)

        // code to communicate with the backend
        // send HTTP request to the backend
        // create a new Conference object which contains the values coming from the form
        // properties of the new object are set to the data in this.state.[property]
        // form input elements are putting the values into the state

        const newUniversity = {
            university_name: this.state.university_name,
            university_country: this.state.university_country,
            university_city: this.state.university_city
        }

        // post method is from the Axios library
        // pass in the url path of the endpoint
        // pass in the new Conference object as a second argument
        axios.post('http://localhost:6001/universities/create', newUniversity)
        // get back a promise
            .then(res => console.log(res.data));

        // sets the state to the initial values in the constructor
        this.setState({
            university_name: '',
            university_country: '',
            university_city: '',
        })

        this.props.history.push(`/universities`)
    }

    // JSX code needed to output the form
    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Create a New University</h1>
                        { /* Set the onSubmit attribute. Binds the onSubmit event of the form to be handled
                         by the onSubmit method of the component.*/}
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Name: </label>
                                <input type="text"
                                       className="form-control"
                                    /* The value attribute is set to the corresponding state property. */
                                       value={this.state.university_name}
                                    /* Bind the method that is taking the value from the event object
                                     for the name property to the onChange event. This way the state property is
                                      always updated and reflects the latest value which is input the user in this field. */
                                       onChange={this.onCreateUniversitiesName}
                                />
                            </div>
                            <div className="form-group">
                                <label>Country: </label>
                                <input type="text"
                                       className="form-control"
                                    /* The value attribute is set to the corresponding state property. */
                                       value={this.state.university_country}
                                    /* Bind the method that is taking the value from the event object
                                     for the name property to the onChange event. This way the state property is
                                      always updated and reflects the latest value which is input the user in this field. */
                                       onChange={this.onCreateUniversitiesCountry}
                                />
                            </div>
                            <div className="form-group">
                                <label>City: </label>
                                <input type="text"
                                       className="form-control"
                                    /* The value attribute is set to the corresponding state property. */
                                       value={this.state.university_city}
                                    /* Bind the method that is taking the value from the event object
                                     for the name property to the onChange event. This way the state property is
                                      always updated and reflects the latest value which is input the user in this field. */
                                       onChange={this.onCreateUniversitiesCity}
                                />
                            </div>
                            <div className="form-group">
                                <input type="submit"
                                       value="Create University"
                                       className="btn btn-primary"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default UniversitiesCreate
