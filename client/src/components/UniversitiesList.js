import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Table, Button } from 'react-bootstrap';
var isEqual = require('lodash.isequal');


class UniversitiesList extends Component {
    constructor(props) {
        super(props);
        // set the initial state object to contain a property of conferences containing an empty array
        this.state = { universities: []}
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
        axios.get('http://localhost:6001/universities/list')
        // set the state with the data that is delivered with the response object
        // the data is available in the data property
            .then(response => {
                this.setState({universities: response.data})
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        // get method is from the Axios library
        // pass in the url path of the endpoint
        // no data has to be send as a second argument because this is a get request
        axios.get('http://localhost:6001/universities/list')
            .then(response => {
                console.log(isEqual(response.data, this.state.universities));
                // if the data in the response (from the Edit request) doesn't match what is in the database then update the state
                if (!isEqual (response.data, this.state.universities)) {
                    // set the state with the data that is delivered with the response object
                    // the data is available in the data property
                    this.setState({universities: response.data})
                    //console.log(this.state.conferences);
                }
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    componentDidDelete = (id) => {
        axios.delete('http://localhost:6001/universities/delete/'+id)
            .then(res => {
                this.setState(prevState => {
                    return {
                        universities: prevState.universities.filter( p => p.id !== id )
                    };
                });
            });
    }


    universityList=(callback)=> {
        // iterate over what is in the state by using the map method
        // use a callback function to get every record (each record is passed in as an argument)
        // the index is the second argument
        return this.state.universities.map(function(currentUniversity, index) {
            // output every line of the table using this component
            // this component is getting passed in a prop called conference
            // this prop is set to what is available in currentConference
            // set the key to the index
            return <University deleteMethod={callback} university = { currentUniversity } key={index}  />;
        });
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <Link to={"/universities-create/"}>Create</Link>
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">List of Universities</h1>
                        <table className="table table-striped" style={{ marginTop: 20}}>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Country</th>
                                <th>City</th>
                            </tr>
                            </thead>
                            <tbody>
                            { this.universityList(this.componentDidDelete) }
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
const University = props => {
    {
        console.log(props.university._id)
    }
    return (
        <tr>
            <td>{props.university.university_name}</td>
            <td>{props.university.university_country}</td>
            <td>{props.university.university_city}</td>
            <td>
                <Link to={"/universities-edit/" + props.university._id}>Edit</Link>
            </td>
            <td>
                <button onClick={() => props.deleteMethod(props.university._id)} className="btn btn-danger">Delete
                </button>
            </td>
        </tr>
    )

}

export default UniversitiesList
