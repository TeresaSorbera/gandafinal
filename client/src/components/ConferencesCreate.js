import React, { Component } from 'react'
import logo from "../GandaLogo.jpg";
// access the API the Axios library is offering
import axios from 'axios';
import "../styles.scss";

class ConferencesCreate extends Component {

    constructor(props) {
        // call the parent's constructor
        super(props);

        // methods below must be bound to the this object otherwise the state object is inaccessible
        this.onCreateConferencesName = this.onCreateConferencesName.bind(this);
        this.onCreateConferencesDescription = this.onCreateConferencesDescription.bind(this);
        this.onCreateConferencesDate = this.onCreateConferencesDate.bind(this);
        this.onCreateConferencesUniversity = this.onCreateConferencesUniversity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // set a state for this component
        this.state = {
            conference_name: '',
            conference_description: '',
            conference_date: '',
            conference_university: '',
        }
    }

    // methods will be used by form to update the state object with the values input by the user
    // methods take the event as a parameter

    onCreateConferencesName(e) {
        // update the component's state; take an object with the updated key/value pair
        this.setState({
            conference_name: e.target.value
        });
    }

    onCreateConferencesDescription(e) {
        // update the component's state; take an object with the updated key/value pair
        this.setState({
            conference_description: e.target.value
        });
    }

    onCreateConferencesDate(e) {
        // update the component's state; take an object with the updated key/value pair
        this.setState({
            conference_date: e.target.value
        });
    }

    onCreateConferencesUniversity(e) {
        // update the component's state; take an object with the updated key/value pair
        this.setState({
            conference_university: e.target.value
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
        console.log(`Name: ${this.state.conference_name}`)
        console.log(`Description: ${this.state.conference_description}`)
        console.log(`Date: ${this.state.conference_date}`)
        console.log(`University: ${this.state.conference_university}`)

        // code to communicate with the backend
        // send HTTP request to the backend
        // create a new Conference object which contains the values coming from the form
        // properties of the new object are set to the data in this.state.[property]
        // form input elements are putting the values into the state

        const newConference = {
            conference_name: this.state.conference_name,
            conference_description: this.state.conference_description,
            conference_date: this.state.conference_date,
            conference_university: this.state.conference_university
        }

        // post method is from the Axios library
        // pass in the url path of the endpoint
        // pass in the new Conference object as a second argument
        axios.post('http://localhost:6001/conferences/create', newConference)
            // get back a promise
             .then(res => this.props.history.push(`/conferences`));


        // sets the state to the initial values in the constructor
        this.setState({
            conference_name: '',
            conference_description: '',
            conference_date: '',
            conference_university: '',
        })
    }

    // JSX code needed to output the form
    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Create a New Conference</h1>
                        { /* Set the onSubmit attribute. Binds the onSubmit event of the form to be handled
                         by the onSubmit method of the component.*/}
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Name: </label>
                                <input type="text"
                                       className="form-control"
                                       /* The value attribute is set to the corresponding state property. */
                                       value={this.state.conference_name}
                                       /* Bind the method that is taking the value from the event object
                                        for the name property to the onChange event. This way the state property is
                                         always updated and reflects the latest value which is input the user in this field. */
                                       onChange={this.onCreateConferencesName}
                                       />
                            </div>
                            <div className="form-group">
                                <label>Description: </label>
                                <input type="text"
                                       className="form-control"
                                    /* The value attribute is set to the corresponding state property. */
                                       value={this.state.conference_description}
                                    /* Bind the method that is taking the value from the event object
                                     for the name property to the onChange event. This way the state property is
                                      always updated and reflects the latest value which is input the user in this field. */
                                       onChange={this.onCreateConferencesDescription}
                                />
                            </div>
                            <div className="form-group">
                                <label>Date: </label>
                                <input type="date"
                                       className="form-control"
                                    /* The value attribute is set to the corresponding state property. */
                                       value={this.state.conference_date}
                                    /* Bind the method that is taking the value from the event object
                                     for the name property to the onChange event. This way the state property is
                                      always updated and reflects the latest value which is input the user in this field. */
                                       onChange={this.onCreateConferencesDate}
                                />
                            </div>
                            <div className="form-group">
                                <label>University: </label>
                                <input type="text"
                                       className="form-control"
                                    /* The value attribute is set to the corresponding state property. */
                                       value={this.state.conference_university}
                                    /* Bind the method that is taking the value from the event object
                                     for the name property to the onChange event. This way the state property is
                                      always updated and reflects the latest value which is input the user in this field. */
                                       onChange={this.onCreateConferencesUniversity}
                                />
                            </div>
                            <div className="form-group">
                                <input type="submit"
                                       value="Create Conference"
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

export default ConferencesCreate
