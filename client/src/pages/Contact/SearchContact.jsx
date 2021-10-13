import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from "material-ui-search-bar";
import axios from 'axios';
import FormControl from '@mui/material/FormControl';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

function SearchContact() {
    let [contactName, searchName] = useState("");

    function handleSearch(event) {
        searchName(event.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        let input = {
            contactName: undefined
        };
        if (contactName) {
            input.contactName = contactName;
        }

        axios.post(``, input).then((res) => {
            window.location.href = `contact`;
        });
    }

    return (
        // <>
        // </>
        // <FormControl fullWidth>
        <Box sx={{ flexGrow: 1 }}>
            <Search>
                <SearchIconWrapper>
                <SearchIcon />
                </SearchIconWrapper>
                <form onSubmit={handleSubmit}>
                    <StyledInputBase
                    onChange={handleSearch}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </form>
            </Search>
        </Box>
        

        // <SearchBar
        //     // value={this.state.value}
        //     // onChange={(newValue) => this.setState({ value: newValue })}
        //     // onRequestSearch={() => doSomethingWith(this.state.value)}
        // />
    )
}

export default SearchContact;
