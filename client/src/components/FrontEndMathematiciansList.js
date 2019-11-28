import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Table, Button } from 'react-bootstrap';

// the function is getting passed in props as arguments
// the function body contains the JSX code that is being returned
// print out a single row in the table
// props.conference is what is getting passed into the component via a property
const Mathematician = props => (
    <tr>
        <td>{props.mathematician.first_name}</td>
        <td>{props.mathematician.last_name}</td>
        <td>{props.mathematician.email}</td>
        <td>{props.mathematician.university}</td>
    </tr>
)

class FrontEndMathematiciansList extends Component {
    constructor(props) {
        super(props);
        // set the initial state object to contain a property of conferences containing an empty array
        this.state = { mathematicians: []}
    }

    /* send a request to the backend to get conference records from the database
    and set the conferences property by populating the array.
    use the component lifecycle method componentDidMount to communicate with the backend
     */

    componentDidMount() {
        // get method is from the Axios library
        // pass in the url path of the endpoint
        // no data has to be send as a second argument because this is a get request
        axios.get('http://localhost:6001/frontend/mathematicians/list')
        // set the state with the data that is delivered with the response object
        // the data is available in the data property
            .then(response => {
                this.setState({mathematicians: response.data})
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    // componentDidUpdate() {
    //     // get method is from the Axios library
    //     // pass in the url path of the endpoint
    //     // no data has to be send as a second argument because this is a get request
    //     axios.get('http://localhost:6001/conferences/list')
    //     // set the state with the data that is delivered with the response object
    //     // the data is available in the data property
    //         .then(response => {
    //             this.setState({conferences: response.data})
    //         })
    //         .catch(function(error) {
    //             console.log(error);
    //         })
    // }


    mathematicianList() {
        // iterate over what is in the state by using the map method
        // use a callback function to get every record (each record is passed in as an argument)
        // the index is the second argument
        return this.state.mathematicians.map(function(currentMathematician, index) {
            // output every line of the table using this component
            // this component is getting passed in a prop called conference
            // this prop is set to what is available in currentConference
            // set the key to the index
            return <Mathematician mathematician = { currentMathematician } key={index}  />;
        });
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">List of Mathematicians</h1>
                        <table className="table table-striped" style={{ marginTop: 20}}>
                            <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>University</th>
                            </tr>
                            </thead>
                            <tbody>
                            { this.mathematicianList() }
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        )
    }
}


export default FrontEndMathematiciansList
