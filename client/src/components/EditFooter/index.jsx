import React, { Component, Fragment } from 'react'
import Button from '@mui/material/Button';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class EditFooter extends Component {
    state = {
        isEdit: false
    }

    edit = () => {
        this.setState({isEdit: true});
        this.props.handleEdit(true);
    }

    cancle = () => {
        this.setState({isEdit:false});
        this.props.handleEdit(false);
        this.props.handleCancle();
    }

    confirm = () => {
        const {contactInfo} = this.props;
        axios({
            method:'PUT',
            url:`http://localhost:5000/api/contacts/info/${contactInfo._id}`,
            data: {
                contact: {
                    ...contactInfo
                }
            }
        }).then(response => {       
            this.setState({isEdit: false});
            this.props.handleEdit(false);
            // console.log('update',response.data.info);
            this.props.history.push('/contact/info', {contact: response.data.info});
        }
        , error => {
            alert("Invalid Information Form");
            // this.setState({error: true, success: false})
        })
    }

    delete = () => {
        const {contactInfo} = this.props;
        axios({
            method:'DELETE',
            url:`http://localhost:5000/api/contacts/info/${contactInfo._id}`
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

    render() {
        const {isEdit} = this.state;
        // console.log('props',this.props.contactInfo);
        return (
            <Fragment>
                 <Button 
                    ref={c => this.editButton = c}
                    variant="contained" 
                    onClick={this.edit}
                    style={{marginLeft:'32px', display: isEdit ? 'none':''}}
                >{this.state.isEdit ? 'confirm':'edit'}</Button>

                <Button 
                    variant="contained" 
                    type='submit' 
                    onClick={this.delete}
                    style={{
                        float: 'right', 
                        marginRight:'34px', 
                        backgroundColor:'#e71313',
                        display: isEdit ? 'none':''
                    }}
                >Delete</Button>

                <Button 
                    variant="contained" 
                    type='submit' 
                    onClick={this.confirm}
                    style={{display: isEdit ? '':'none', left:'320px'}}
                    // disabled={success}
                >Confirm</Button>

                <Button 
                    variant="contained" 
                    onClick={this.cancle}
                    style={{display: isEdit ? '':'none', left:'386px', backgroundColor:'#e71313'}}
                    // disabled={success}
                >Cancle</Button>
            </Fragment>
        )
    }
}

export default withRouter(EditFooter)
