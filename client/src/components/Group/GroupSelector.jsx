import React, { Component, Fragment } from 'react';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default class GroupSelector extends Component {
    state = {
        group:{},
        allGroups:[]
    }

    handleChange = (e) => {
        this.setState({group: e.target.value});
        this.props.handleGroup(e.target.value);
    }

    componentDidMount() {
        axios({
            method:'GET',
            url:`http://localhost:3000/group`
        }).then(response => {
            this.setState({allGroups: response.data.allGroups});
        }
        , error => {
        })
    }


    render() {
        console.log('render group')
        const {group, allGroups} = this.state;
        console.log(this.state.allGroups);
        return (
            <Fragment>
                <FormControl variant="filled" sx={{ m: 4, minWidth: '50ch'}}>
                    <InputLabel id="demo-simple-select-filled-label">Group</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={group}
                        onChange={this.handleChange}
                        // autoWidth
                        label="Group"
                    >
                        {
                            allGroups.map(groupObj => {
                                return (
                                    <MenuItem key={groupObj._id} value={groupObj}>{groupObj.groupName}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </Fragment>
        )
    }
}