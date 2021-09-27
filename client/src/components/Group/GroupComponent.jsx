import React from "react";
import Divider from "@mui/material/Divider";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

function GroupComponent(props) {
    console.log(props.contactId);

    const history = useHistory();

    const routeChange = () =>{ 
        let path = `/api/contacts/info/${props.contactId}`; 
        history.push(path);
    }

    return (
        <React.Fragment>
            <p calssName="jump_to_info" onClick={routeChange}>
                {props.contact.firstName} {props.contact.lastName}
                {/* <Divider /> */}
            </p>
        </React.Fragment>
    );
}

export default GroupComponent;