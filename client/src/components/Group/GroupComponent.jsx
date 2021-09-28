import React from "react";
import Divider from "@mui/material/Divider";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function GroupComponent(props) {
    console.log(props.contactId);

    const history = useHistory();
    console.log(props);
    const routeChange = () =>{ 
        // let path = `/contact/info/${props.contactId}`; 
        
        // history.push(path);
        // console.log(history);
        let url = "localhost:3000/contact/info/" + props.contactId;
        console.log(props.contactId);
        window.open(url);
    }

    // let firstPathName = window.location.pathname.split("/");
    // let [page, setPage] = useState(firstPathName[1]);
    // if (!page) {
    //     setPage("dashboard");
    // }

    return (
        <React.Fragment>
            {/* <Link to="/contact" onClick={() => setPage("contact")}></Link> */}

            <p className="jump_to_info" onClick={routeChange}>
                {props.contact.firstName} {props.contact.lastName}
                {/* <Divider /> */}
            </p>
        </React.Fragment>
    );
}

export default GroupComponent;