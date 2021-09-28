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

    const history = useHistory();
    // console.log(props);
    const routeChange = () =>{ 
        // let path = `/contact/info/${props.contactId}`; 
        
        // history.push(path);
        // console.log(history);
        let url = "localhost:3000/contact/info/" + props.contactId;
        // console.log(props.contactId);
        window.open(url);
    }

    const [Info, setInfo] = React.useState([]);

    const getContactInfo = async () => {
        const result = await axios(`/api/contacts/info/${props.contactId}`);
        if (result.data.status !== 200){
            // console.log(result);
        } else {
        }
        setInfo(result.data.info);
    };

    useEffect(() => {
        getContactInfo();
    }, []);

    console.log(props.contact);

    // let firstPathName = window.location.pathname.split("/");
    // let [page, setPage] = useState(firstPathName[1]);
    // if (!page) {
    //     setPage("dashboard");
    // }

    return (
        <React.Fragment>
            <Link to='/contact/info'>{props.contact.firstName} {props.contact.lastName}</Link>
            {/* <Link to={{pathName:'/contact/add-contact', state:{contact:props.contact}}}>{props.contact.firstName}{props.contact.lastName} </Link> */}
            {/* <Link to='/contact/info' render={(Info) => {
                return (
                    <div>
                        <p>this</p>
                        <ContactInfo {...Info}>{props.contact.firstName}{props.contact.lastName}</ContactInfo>
                    </div>
                    
                )
            }}>

            </Link> */}
        </React.Fragment>

        // <React.Fragment>
        //     <p>
        //         {props.contact.firstName} {props.contact.lastName} 
        //     </p>
        // </React.Fragment>
    );
}

export default GroupComponent;