import React from "react";
import Divider from "@mui/material/Divider";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import { Link, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AuthFail from "../../components/AuthFail";
import ContactInfo from "../../pages/Contact/ContactInfo";

function GroupComponent(props) {
    // console.log(props.contactId);



    // let firstPathName = window.location.pathname.split("/");
    // let [page, setPage] = useState(firstPathName[1]);
    // if (!page) {
    //     setPage("dashboard");
    // }

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