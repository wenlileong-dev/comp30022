import React from "react";
import Divider from "@mui/material/Divider";
import { Link, Route } from "react-router-dom";

function GroupComponent(props) {

    if (props.contact.remark) {
        return (
            <div style={{ fontSize: "15px" }}>
                <Link
                    
                    to={{pathname:`/contact/info`,
                    state:{contact:props.contact}}}
                >
                {props.contact.firstName} {props.contact.lastName} {"(" + props.contact.remark + ")"}
                </Link>
                <br/>
            </div>
    
        );
    }
    else {
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

    // return (
    //     <div style={{ fontSize: "15px" }}>
    //         <Link
                
    //             to={{pathname:`/contact/info`,
    //             state:{contact:props.contact}}}
    //         >
    //         {props.contact.firstName} {props.contact.lastName} 
    //         </Link>
    //         <br/>
    //     </div>

    // );
}

export default GroupComponent;