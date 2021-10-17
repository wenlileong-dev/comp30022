import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

export default class Contact extends Component {
    render() {
        return (
            <Fragment>
                <Link to='/contact/add-contact'>
                    {/* Add New Contact */}
                    <Button
                        variant="contained"
                        color="primary"
                        id="add-contact-button"
                        startIcon={<ContactPhoneIcon />}
                        >
                        New Contact
                    </Button>
                </Link>
            </Fragment>
        )
    }
}
