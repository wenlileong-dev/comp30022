import React from "react";
import { Link } from "react-router-dom";

function GroupComponent(props) {
    return (
        <div style={{ fontSize: "15px" }}>
            <Link
                to={{pathname:`/contact/info`,
                state:{contact:props.contact}}}
            >
            {props.contact.firstName} {props.contact.lastName} 
            </Link>
            <br/>
        </div>

    );
}

export default GroupComponent;