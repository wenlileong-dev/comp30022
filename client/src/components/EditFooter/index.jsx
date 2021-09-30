import React, { Component, Fragment } from 'react'
import Button from '@mui/material/Button';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import './index.css';

class EditFooter extends Component {
    state = {
        isEdit: false,
        error: false
    }

    back = () => {
        this.props.history.push('/contact');
    }

    edit = () => {
        this.setState({isEdit: true});
        this.props.handleEdit(true);
    }

    cancle = () => {
        this.setState({isEdit:false, error: false});
        this.props.handleEdit(false);
        this.props.handleCancle();
    }

    update = () => {
        const {contactInfo} = this.props;
        axios({
            method:'PUT',
            url:`http://localhost:3000/api/contacts/info/${contactInfo._id}`,
            data: {
                contact: {
                    ...contactInfo
                }
            }
        }).then(response => {       
            this.setState({isEdit: false, error: false});
            this.props.handleEdit(false);
            // console.log('update',response.data.info);
            // this.props.history.push('/contact/info', {contact: response.data.info});
            this.props.history.replace('/contact');
            
        }
        , error => {
            this.setState({error: true})
        })
    }

    delete = () => {
        if(window.confirm('Do you want to delete')) {
            const {contactInfo} = this.props;
            axios({
                method:'DELETE',
                url:`http://localhost:3000/api/contacts/info/${contactInfo._id}`
            }).then(response => {       
                this.setState({isEdit: false});
                this.props.handleEdit(false);
                // console.log('update',response.data.info);
                this.props.history.replace('/contact');
            }
            , error => {
                alert(error);
                // this.setState({error: true, success: false})
            })
        }
    }

    render() {
        const {isEdit, error} = this.state;

        // console.log('props',this.props.contactInfo);
        return (
            <Fragment>
                 <Button 
                    id='contactEdit'
                    ref={c => this.editButton = c}
                    variant="contained" 
                    onClick={this.edit}
                    style={{display: isEdit ? 'none':''}}
                >edit</Button>

                <Button 
                    id='contactDelete'
                    variant="contained" 
                    type='submit' 
                    onClick={this.delete}
                    style={{
                        display: isEdit ? 'none':''
                    }}
                >Delete</Button>

                <Button 
                    id='contactUpdate'
                    variant="contained" 
                    type='submit' 
                    onClick={this.update}
                    style={{display: isEdit ? '':'none'}}
                >Confirm</Button>

                <Button 
                    id='contactCancle'
                    variant="contained" 
                    onClick={this.cancle}
                    style={{display: isEdit ? '':'none'}}
                >Cancle</Button>

                <br/>
                <br/>
                <Button
                    id='contactBack'
                    ref={c => this.editButton = c}
                    variant="contained" 
                    onClick={this.back}
                >Back to Group</Button>
                
                <br/>
                <br/>
                <Alert severity="warning" style={{display: error ? '': 'none'}}>
                    <AlertTitle>Warning</AlertTitle>
                    Invalid Information Form — <strong>check it out!</strong>
                 </Alert>
            </Fragment>
        )
    }
}

export default withRouter(EditFooter)
