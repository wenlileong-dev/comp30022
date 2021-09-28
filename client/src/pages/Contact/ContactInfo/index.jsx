import React, { Component, Fragment } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import EditFooter from '../../../components/EditFooter';

export default class ContactInfo extends Component {
    state = {
        isEdit: false,
        contact: {
            ...this.props.location.state.contact
        },
        cancle: true,
    }
    // static getDerivedStateFromProps(props, state) {
    //     const {id} = props.match.params; 
    //     axios(
    //         {
    //             method: 'GET',
    //             url: `http://localhost:5000/api/contacts/info/${id}`,
    //         }).then(response => {
    //             console.log(response.data);
    //             this.setState({contact:response.data.info})
    //             console.log(state.contact.gender)
    //         }, error => {
    //             this.setState({error});
    //         })
    //     return null;
    // }

    updateFirstName = (e) => {
        const contact = Object.assign({}, this.state.contact, {firstName: e.target.value});
        this.setState({contact: contact});
    }

    updateLastName = (e) => {
        const contact = Object.assign({}, this.state.contact, {lastName: e.target.value});
        this.setState({contact: contact});
    }

    updateGender = (e) => {
        const contact = Object.assign({}, this.state.contact, {gender: e.target.value});
        this.setState({contact: contact});
    }

    updatePhone = (e) => {
        const contact = Object.assign({}, this.state.contact, {phone: e.target.value});
        this.setState({contact: contact});
    }

    updateEmail = (e) => {
        const contact = Object.assign({}, this.state.contact, {email: e.target.value});
        this.setState({contact: contact});
    }

    updateDepartment = (e) => {
        const contact = Object.assign({}, this.state.contact, {department: e.target.value});
        this.setState({contact: contact});
    }

    updateAddress= (e) => {
        const contact = Object.assign({}, this.state.contact, {address: e.target.value});
        this.setState({contact: contact});
    }

    updateRemark= (e) => {
        const contact = Object.assign({}, this.state.contact, {remark: e.target.value});
        this.setState({contact: contact});
    }

    handleEdit = (isEdit) => {
        this.setState({isEdit});
        // console.log(isEdit);
    }

    handleCancle = () => {
        const contact = this.props.location.state.contact;
        // console.log(this.state.contact);
        this.setState({contact});
        // console.log(this.state.contact);
    }

    render() {
        
        const {contact} = this.state;
        // console.log('ORI', this.props.location.state.contact);
        const {isEdit} = this.state;
        
        return (
            <Fragment>
                <Typography className='newContact' variant="h4" gutterBottom component="div">
                    Contact Information
                </Typography>
                <Box 
                    sx={{
                        width: '117ch',
                        height: '100ch',
                        border: '1px solid rgb(221,225,230)',
                        margin: 'auto',
                        '& .MuiTextField-root': { m: 4, width: '50ch'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        onChange={this.updateFirstName}
                        label="First Name"
                        // defaultValue= {contact.firstName}
                        value={contact.firstName}
                        InputProps={{
                            readOnly: !isEdit,
                        }}
                        variant="filled"
                    />

                    <TextField
                        onChange={this.updateLastName}
                        label="Last Name"
                        value= {contact.lastName}
                        InputProps={{
                            readOnly: !isEdit,
                        }}
                        variant="filled"
                    />

                    <FormControl style={{top:'30px',width:'454px', paddingLeft:'5px'}} className="contactSelector" component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup  onChange={this.updateGender} row aria-label="gender" name="row-radio-buttons-group">
                            <FormControlLabel 
                                disabled={isEdit ? false:true} 
                                checked={contact.gender === 'female' ? true:false} 
                                value="female" 
                                control={<Radio />} 
                                label="Female" />
                            <FormControlLabel  
                                disabled={isEdit ? false:true} 
                                checked={contact.gender === 'male' ? true:false} 
                                value="male" 
                                control={<Radio />} 
                                label="Male" />
                        </RadioGroup>
                    </FormControl>

                    <TextField
                        onChange={this.updatePhone}
                        label="Phone Number"
                        value= {contact.phone}
                        InputProps={{
                            readOnly: !isEdit,
                        }}
                        variant="filled"
                    />
                    <TextField
                        onChange={this.updateEmail}
                        label="Email Address"
                        value= {contact.email}
                        InputProps={{
                            readOnly: !isEdit,
                        }}
                        variant="filled"
                    />
                    <TextField
                        onChange={this.updateDepartment}
                        label="Department"
                        value= {contact.department}
                        InputProps={{
                            readOnly: !isEdit,
                        }}
                        variant="filled"
                    />
                    <TextField
                        onChange={this.updateAddress}
                        label="Address"
                        value= {contact.address}
                        InputProps={{
                            readOnly: !isEdit,
                        }}
                        variant="filled"
                    />
                    <TextField
                        onChange={this.updateRemark}
                        label="Remark"
                        value= {contact.remark}
                        InputProps={{
                            readOnly: !isEdit,
                        }}
                        variant="filled"
                    />

                    <br/>
                    <EditFooter 
                        handleEdit={this.handleEdit}
                        handleCancle={this.handleCancle}
                        contactInfo={this.state.contact}
                    />
                </Box>
               
            </Fragment>
        )
    }
}
