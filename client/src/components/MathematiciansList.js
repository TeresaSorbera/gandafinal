import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "../styles.scss";
import axios from 'axios'
import { Table, Button } from 'react-bootstrap';
var isEqual = require('lodash.isequal');


class MathematiciansList extends Component {
    constructor(props) {
        super(props);
        // set the initial state object to contain a property of conferences containing an empty array
        this.state = { mathematicians: []}
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
        axios.get('http://localhost:6001/mathematicians/list')
        // set the state with the data that is delivered with the response object
        // the data is available in the data property
            .then(response => {
                this.setState({mathematicians: response.data})
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        // get method is from the Axios library
        // pass in the url path of the endpoint
        // no data has to be send as a second argument because this is a get request
        axios.get('http://localhost:6001/mathematicians/list')
            .then(response => {
                console.log(isEqual(response.data, this.state.mathematicians));
                // if the data in the response (from the Edit request) doesn't match what is in the database then update the state
                if (!isEqual (response.data, this.state.mathematicians)) {
                    // set the state with the data that is delivered with the response object
                    // the data is available in the data property
                    this.setState({mathematicians: response.data})
                    //console.log(this.state.conferences);
                }
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    componentDidDelete = (id) => {
        axios.delete('http://localhost:6001/mathematicians/delete/'+id)
            .then(res => {
                this.setState(prevState => {
                    return {
                        mathematicians: prevState.mathematicians.filter( p => p.id !== id )
                    };
                });
            });
    }


    mathematicianList=(callback)=> {
        // iterate over what is in the state by using the map method
        // use a callback function to get every record (each record is passed in as an argument)
        // the index is the second argument
        return this.state.mathematicians.map(function(currentMathematician, index) {
            // output every line of the table using this component
            // this component is getting passed in a prop called conference
            // this prop is set to what is available in currentConference
            // set the key to the index
            return <Mathematician deleteMethod={callback} mathematician = { currentMathematician } key={index}  />;
        });
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <Link to={"/mathematicians-create/"}>Create</Link>
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">List of Mathematicians</h1>
                        <table className="table table-striped" style={{ marginTop: 20}}>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Last Name</th>
                                <th>University</th>
                                <th>Email</th>
                            </tr>
                            </thead>
                            <tbody>
                            { this.mathematicianList(this.componentDidDelete) }
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
const Mathematician = props => {
    {
        console.log(props.mathematician._id)
        console.log(props.mathematician.first_name)
    }
    return (
        <tr>
            <td>{props.mathematician.first_name}</td>
            <td>{props.mathematician.last_name}</td>
            <td>{props.mathematician.university}</td>
            <td>{props.mathematician.email}</td>
            <td>
                <Link to={"/mathematicians-edit/" + props.mathematician._id} className="editbutton">Edit</Link>
            </td>
            <td>
                <button onClick={() => props.deleteMethod(props.mathematician._id)} className="button btn btn-danger">Delete
                </button>
            </td>
        </tr>
    )

}

export default MathematiciansList
