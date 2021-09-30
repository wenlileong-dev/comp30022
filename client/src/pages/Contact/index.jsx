import React, { Component, Fragment } from 'react'
import { Switch, Route, Redirect, Link } from "react-router-dom";
import NewContact from './NewContact/'

export default class Contact extends Component {
    render() {
        return (
            <Fragment>
                <Link to='/contact/add-contact'>Add New Contact</Link>

                {/* <Switch>
                    <Route path='/contact/add-contact' component={NewContact}/>
                </Switch> */}
            </Fragment>
        )
    }
}
