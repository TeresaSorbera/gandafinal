import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "../styles.scss";
import axios from 'axios'
import { Table, Button } from 'react-bootstrap';
var isEqual = require('lodash.isequal');


class ConferencesList extends Component {
    constructor(props) {
        super(props);
        // set the initial state object to contain a property of conferences containing an empty array
        this.state = { conferences: []}
        this.componentDidDelete = this.componentDidDelete.bind(this);
    }

    /* send a request to the backend to get conference records from the database
    and set the conferences property by populating the array.
    use the component lifecycle method componentDidMount to communicate with the backend
     */

    componentDidMount() {
        // get method is from the Axios library
        // pass in the url path of the endpoint
        // no data has to be send as a second argument because this is a get request
        axios.get('http://localhost:6001/conferences/list')
            // set the state with the data that is delivered with the response object
            // the data is available in the data property
            .then(response => {
               this.setState({conferences: response.data})
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        // get method is from the Axios library
        // pass in the url path of the endpoint
        // no data has to be send as a second argument because this is a get request
        axios.get('http://localhost:6001/conferences/list')
            .then(response => {
                console.log(isEqual(response.data, this.state.conferences));
                // if the data in the response (from the Edit request) doesn't match what is in the database then update the state
                if (!isEqual (response.data, this.state.conferences)) {
                    // set the state with the data that is delivered with the response object
                    // the data is available in the data property
                    this.setState({conferences: response.data})
                    //console.log(this.state.conferences);
                }
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    componentDidDelete = (id) => {
        axios.delete('http://localhost:6001/conferences/delete/'+id)
            .then(res => {
                this.setState(prevState => {
                    return {
                        conferences: prevState.conferences.filter( p => p.id !== id )
                    };
                });
            });
    }


    conferenceList=(callback)=> {
        // iterate over what is in the state by using the map method
        // use a callback function to get every record (each record is passed in as an argument)
        // the index is the second argument
        return this.state.conferences.map(function(currentConference, index) {
            // output every line of the table using this component
            // this component is getting passed in a prop called conference
            // this prop is set to what is available in currentConference
            // set the key to the index
            return <Conference deleteMethod={callback} conference = { currentConference } key={index}  />;
        });
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <Link to={"/conferences-create/"}>Create</Link>
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">List of Conferences</h1>
                        <table className="table table-striped" style={{ marginTop: 20}}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>University</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.conferenceList(this.componentDidDelete) }
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

// the function is getting passed in props as arguments
// the function body contains the JSX code that is being returned
// print out a single row in the table
// props.conference is what is getting passed into the component via a property
const Conference = props => {
    {
        console.log(props.conference._id)
    }
    return (
        <tr>
            <td>{props.conference.conference_name}</td>
            <td>{props.conference.conference_description}</td>
            <td>{props.conference.conference_date}</td>
            <td>{props.conference.conference_university}</td>
            <td>
                <Link to={"/conferences-edit/" + props.conference._id}className="editbutton">Edit</Link>
            </td>
            <td>
                <button onClick={() => props.deleteMethod(props.conference._id)} className="button btn btn-danger">Delete
                </button>
            </td>
        </tr>
    )

}

export default ConferencesList
