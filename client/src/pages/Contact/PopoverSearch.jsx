import React, { useState } from "react";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";

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

function PopoverSearch(props) {

  let [contactName, searchName] = useState("");
  let [searchResult, search] = useState("");

  function handleSearch(event) {
    searchName(event.target.value);
  }


  function handleSubmit(e) {
    e.preventDefault();
    let input = {
        contactName: undefined
    };
    let splitName = contactName.split(' ');

    let firstname, lastname;
    if (splitName.length >= 2) {
        firstname = splitName[0];
        lastname = splitName[1];      
    }
    else {
        firstname = splitName[0];
        lastname = '';
    }

    axios.get(`/api/contacts/search`, {params: {firstname:firstname, lastname:lastname}}).then((res) => {
        search(res.data.result);
    });
    
  }

  return (
    <div style={{ fontSize: "15px" }}>
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

        {searchResult&&
            searchResult.map((contact, index) => {
                return (
                    <Link
                        to={{pathname:`/contact/info`,
                        state:{contact:contact}}}
                        key={`searchName${index}`}
                    >
                        {contact.firstName} {contact.lastName} <br/>
                    </Link>
                );
                
            })
        }
    </div>
  );
}

export default PopoverSearch;
