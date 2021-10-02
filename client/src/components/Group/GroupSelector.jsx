import React, { Component, Fragment } from 'react';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default class GroupSelector extends Component {
    state = {
        groupID:'',
        allGroups:[],
    }

    handleChange = (e) => {
        this.setState({groupID: e.target.value});
        this.props.handleGroup(e.target.value);
    }

    componentDidMount() {
        axios({
            method:'GET',
            url:`http://localhost:3000/group/all`
        }).then(response => {
            this.setState({allGroups: response.data.allGroups});
            console.log('update allGroups');
            if (this.props.contact === undefined) {
                this.setState({groupID: response.data.allGroups[0]._id});
                this.props.handleGroup(response.data.allGroups[0]._id);
            }
            else {
                this.setState({groupID: this.props.contact.groupID});
                console.log('update GroupID')
            }
            
            console.log('contact',this.props.contact);
        }
        , error => {
        })
    }


    render() {
        // console.log('render group')
        const {groupID, allGroups} = this.state;
        const {contact, isEdit} = this.props;
        console.log('contact in selector', contact);
        return (
            <Fragment>
                <FormControl variant="filled" sx={{ m: 4, minWidth: '50ch'}}>
                    <InputLabel id="demo-simple-select-filled-label">Group</InputLabel>
                    <Select
                        readOnly={!isEdit}
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={isEdit ? groupID: contact.groupID}
                        onChange={this.handleChange}
                        // autoWidth
                        label="Group"
                    >   
                        {
                            allGroups.map(groupObj => {
                                return (
                                    <MenuItem key={groupObj._id} value={groupObj._id}>{groupObj.groupName}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </Fragment>
        )
    }
}