import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Link, Route } from "react-router-dom";

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

//   let [groupName, setGroup] = useState("");
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
        console.log("2");
        firstname = splitName[0];
        lastname = splitName[1];
        
    }
    else {
        console.log("1");
        firstname = splitName[0];
        lastname = '';
    }
    
    // if (contactName) {
    //     input.contactName = contactName;
    // }
    if(lastname ===""){console.log("is empty")}
    console.log("f " + typeof firstname);
    console.log("l " + typeof lastname);

    axios.get(`/api/contacts/search`, {params: {firstname:firstname, lastname:lastname}}).then((res) => {
        // window.location.href = `contact`;
        // console.log(res);
        // searchResult = res.data.result;
        search(res.data.result);
        console.log(searchResult);
    });
    
  }
  console.log("search: " + searchResult);
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
        {/* {console.log("search: " + searchResult);} */}
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
        <br/>
    </div>
    //   <>{console.log("??")}</>
    // <React.Fragment>
    //   <form onSubmit={handleSubmit}>
    //     <Grid container spacing={3}>
    //       <Grid item xs={12} sm={6}>
    //         <TextField
    //           variant="standard"
    //           required
    //           label="groupName"
    //           onChange={handleGroup}
    //           value={groupName}
    //         />
    //       </Grid>
          

    //       <Grid item xs={12} sm={12}>
    //         <Button
    //           color="primary"
    //           type="submit"
    //           variant="contained"
    //           startIcon={<AddBoxIcon />}
    //         >
    //           Add Group
    //         </Button>
    //       </Grid>
    //     </Grid>
    //   </form>
    // </React.Fragment>
  );
}

export default PopoverSearch;
