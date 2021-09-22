import React, { Component, Fragment } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';

import Confirm from '../../../components/Confirm';
import './index.css';

export default class NewContact extends Component {
    state = {
        firstName:'',
        lastName:'',
        gender:'',
        email:'',
        phone:'',
        department:'',
        address:'',
        remark:''
    }

    saveFirstName = (e) => {
        this.setState({firstName: e.target.value});
    }

    saveLastName = (e) => {
        this.setState({lastName: e.target.value});
    }

    saveGender = (e) => {
        this.setState({gender: e.target.value});
    }

    savePhone = (e) => {
        this.setState({phone: e.target.value});
    }

    saveEmail = (e) => {
        this.setState({email: e.target.value});
    }

    saveDepartment = (e) => {
        this.setState({department: e.target.value});
    }

    saveAddress = (e) => {
        this.setState({address: e.target.value});
    }

    saveRemark = (e) => {
        this.setState({remark: e.target.value});
    }

    render() {
        return (
            <Fragment>
                {/* <h2 className='newContact'>New Contact</h2> */}
                <Typography className='newContact' variant="h4" gutterBottom component="div">
                    New Contact
                </Typography>
                <Box 
                    // component="form"
                    sx={{
                        width: '117ch',
                        height: '110ch',
                        border: '1px solid rgb(221,225,230)',
                        margin: 'auto',
                        '& .MuiTextField-root': { m: 4, width: '50ch'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                <TextField
                    required
                    label="First Name Required"
                    defaultValue="First Name"
                    variant="filled"
                    onChange={this.saveFirstName}
                />

                <TextField
                    required
                    label="Last Name Required"
                    defaultValue="Last Name"
                    variant="filled"
                    onChange={this.saveLastName}
                />

                <FormControl className="contactSelector" component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup onChange={this.saveGender} row aria-label="gender" name="row-radio-buttons-group">
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                </FormControl>
                
                <br/>
                <TextField
                    required
                    label="Phone Number Required"
                    defaultValue="Phone Number"
                    variant="filled"
                    onChange={this.savePhone}
                />
                
                {/* <br/> */}
                <TextField
                    label="Required"
                    defaultValue="Email Address"
                    variant="filled"
                    onChange={this.saveEmail}
                /> 

                <br/>
                <TextField
                    label="Optional"
                    defaultValue="Department"
                    variant="filled"
                    onChange={this.saveDepartment}
                /> 

                <br/>
                <TextField
                    label="Optional"
                    defaultValue="Address"
                    variant="filled"
                    onChange={this.saveAddress}
                />

                <br/>
                <TextField
                    label="Optional"
                    defaultValue="Remark"
                    variant="filled"
                    onChange={this.saveRemark}
                />
                <br/>
                <br/>
                <Confirm {...this.state}/>
                </Box>
                
            </Fragment>
        )
    }
}
