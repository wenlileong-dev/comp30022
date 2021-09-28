import React, { Component, Fragment } from 'react'
import { Switch, Route, Redirect, Link } from "react-router-dom";
import NewContact from './NewContact/';
import Button from "@mui/material/Button";
import AddBoxIcon from '@mui/icons-material/AddBox';

export default class Contact extends Component {
    render() {
        return (
            <Fragment>
                <Link to='/contact/add-contact'>
                    {/* Add New Contact */}
                    <Button
                        variant="contained"
                        color="primary"
                        id="add-group-button"
                        startIcon={<AddBoxIcon />}
                        >
                        New Contact
                    </Button>
                </Link>

                {/* <Switch>
                    <Route path='/contact/add-contact' component={NewContact}/>
                </Switch> */}
            </Fragment>
        )
    }
}
