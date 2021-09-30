import React from "react";
import Divider from "@mui/material/Divider";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function GroupComponent(props) {
    console.log("gp",props.contactId);

    const history = useHistory();
    console.log(props);

    return (
        <React.Fragment>
            <Link 
                to={{pathname:`/contact/info`, 
                state:{contact:props.contact}}}
            >
            {props.contact.firstName} {props.contact.lastName}
            </Link>
            <br/>
        </React.Fragment>
    );
}

export default GroupComponent;