import {Link} from "react-router-dom";
import React from "react";

const conference = props => {
    console.log(props);
    return (
        props.conferences.map(function(currentConference, index) {
        // return <Conference deleteMethod={this.componentDidDelete} conference = { currentConference } key={index} />;
            console.log(currentConference);
            return(
                <tr>
                    <td>{props.conference.conference_name}</td>
                    <td>{props.conference.conference_description}</td>
                    <td>{props.conference.conference_date}</td>
                    <td>{props.conference.conference_university}</td>
                    <td>
                        <Link to={"/conferences-edit/" + props.conference._id}>Edit</Link>
                    </td>
                    <td>
                        <button onClick={() => props.deleteMethod(props.id)} className="btn btn-danger">Delete</button>
                    </td>
                </tr>
                )
        })
    )
}

export default conference;
