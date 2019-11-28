import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Table, Button } from 'react-bootstrap';


class MembersList extends Component {
    constructor(props) {
        super(props);
        // set the initial state object to contain a property of conferences containing an empty array
        this.state = { members: []}
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
        axios.get('http://localhost:6001/members/list')
        // set the state with the data that is delivered with the response object
        // the data is available in the data property
            .then(response => {
                this.setState({members: response.data})
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

    componentDidDelete = (id) => {
        axios.delete('http://localhost:6001/members/delete/'+id)
            .then(res => {
                this.setState(prevState => {
                    return {
                        members: prevState.members.filter( p => p.id !== id )
                    };
                });
            });
    }


    memberList=(callback)=> {
        // iterate over what is in the state by using the map method
        // use a callback function to get every record (each record is passed in as an argument)
        // the index is the second argument
        return this.state.members.map(function(currentMember, index) {
            // output every line of the table using this component
            // this component is getting passed in a prop called conference
            // this prop is set to what is available in currentConference
            // set the key to the index
            return <Member deleteMethod={callback} member = { currentMember } key={index}  />;
        });
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <Link to={"/members-create/"}>Create</Link>
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">List of Members</h1>
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
                                { this.memberList(this.componentDidDelete) }
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
const Member = props => {
    {
        console.log(props.member._id)
        console.log(props.member.first_name)
    }
    return (
        <tr>
            <td>{props.member.first_name}</td>
            <td>{props.member.last_name}</td>
            <td>{props.member.university}</td>
            <td>{props.member.email}</td>
            <td>
                <Link to={"/members-edit/" + props.member._id}>Edit</Link>
            </td>
            <td>
                <button onClick={() => props.deleteMethod(props.member._id)} className="btn btn-danger">Delete
                </button>
            </td>
        </tr>
    )

}

export default MembersList
