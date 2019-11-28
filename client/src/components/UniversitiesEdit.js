import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class UniversitiesEdit extends Component {

    constructor(props) {
        super(props);

        // methods below must be bound to the this object otherwise the state object is inaccessible
        // make this available
        this.onChangeUniversitiesName = this.onChangeUniversitiesName.bind(this);
        this.onChangeUniversitiesCountry = this.onChangeUniversitiesCountry.bind(this);
        this.onChangeUniversitiesCity = this.onChangeUniversitiesCity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // set initial component state with values
        this.state = {
            university_name: '',
            university_country: '',
            university_city: ''
        }
    }

    // this method is used once a component is mounted
    /* request the record to be edited, retrieve its data from the backend and make it available in the state.
    when implementing the form, bind the state properties to display the values of the current record
    in the form where the user is able to edit the properties */

    componentDidMount() {
        // request the current record to be edited use axios.get to initiate a get request to the backend
        // get the id of the current conference record(concatenate to the endpoint string)
        axios.get('http://localhost:6001/universities/'+this.props.match.params.id)
        // axios.get gets back a promise, respond with using .then
        //pass in a callback function which handles the response
        // the response contains the data for the conference record that is being requested
        // setState takes an object which contains the updated state properties
        // assign the values coming from the backend available in the response
            .then(response => {
                this.setState({
                    university_name: response.data.university_name,
                    university_country: response.data.university_country,
                    university_city: response.data.university_city,
                })
            })
            // invoke a function if there is an error
            // outputs what is available inside of error
            .catch(function(error) {
                console.log(error)
            })
    }

    // takes the event object as a parameter because this function is an event handler
    // gets access to the event data to re-set the state for the property
    // pass the object that contains the property to be re-set
    onChangeUniversitiesName(e) {
        this.setState({
            // set the property of this object to the value available in the corresponding input element of the form
            // access this value by using e.target.value
            university_name: e.target.value
        });
    }
    onChangeUniversitiesCountry(e) {
        this.setState({
            // set the property of this object to the value available in the corresponding input element of the form
            // access this value by using e.target.value
            university_country: e.target.value
        });
    }

    onChangeUniversitiesCity(e) {
        this.setState({
            // set the property of this object to the value available in the corresponding input element of the form
            // access this value by using e.target.value
            university_city: e.target.value
        });
    }

    // send the updated object available in the component state back to the backend
    // make sure the mongoDB database is updated
    onSubmit(e) {
        /* call the method preventDefault to stop the browser's default submit behaviour
        when a form is submitted */
        e.preventDefault();
        // define the object to send to the backend
        // take the data out of the state and assign to the properties
        const editUniversity = {
            university_name: this.state.university_name,
            university_country: this.state.university_country,
            university_city: this.state.university_city
        };
        // initiate a post request to the backend
        // post method is from the Axios library
        // pass in the url path of the endpoint
        // pass in the edited Conference object as a second argument - contains the updated data
        axios.post('http://localhost:6001/universities/update/'+this.props.match.params.id, editUniversity)
            .then(res => console.log(res.data));

        // redirect the user to the conference view
        // navigate to a particular route
        this.props.history.push('/universities');
    }


    /* Use the onSubmit attribute to send the new values to the backend
     when the user clicks the button. Bind the onSubmit attribute/event of the form
     to the onSubmit event handler.
      Bind the form to this.state
      The component componentDidMount's method updates the state of this component
      with the values of the conference properties of the conference being edited
      onChange attribute/event is bound to an event method handler to make sure that
      the new data is send to the backend and that it is successfully updated
      */

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Edit a University Right here</h1>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text"
                                       className="form-control"
                                       value={this.state.university_name}
                                       onChange={this.onChangeUniversitiesName}
                                />
                            </div>
                            <div className="form-group">
                                <label>Country:</label>
                                <input type="text"
                                       className="form-control"
                                       value={this.state.university_country}
                                       onChange={this.onChangeUniversitiesCountry}
                                />
                            </div>
                            <div className="form-group">
                                <label>City:</label>
                                <input type="text"
                                       className="form-control"
                                       value={this.state.university_city}
                                       onChange={this.onChangeUniversitiesCity}
                                />
                            </div>
                            <div className="form-group">
                                <input type="submit"
                                       value="Update Conference"
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

export default UniversitiesEdit
