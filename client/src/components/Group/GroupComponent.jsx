import React from "react";
import Divider from "@mui/material/Divider";

function GroupComponent(props) {
    return (
        <React.Fragment>
            <p>
                {props.contact.firstName} {props.contact.lastName}
                {/* <Divider /> */}
            </p>
        </React.Fragment>
    );
}

export default GroupComponent;