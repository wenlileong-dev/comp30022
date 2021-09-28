import * as React from "react";
import axios from "axios";
import DisplayGroup from "../../components/Group/DisplayGroup";
import AddContactLink from "./index";
import { useState, useEffect } from "react";

import GroupTitle from "../../components/Group/GroupTitle";
import AuthFail from "../../components/AuthFail";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

function Contact() {

  
  //group list and contact list
  const [isAuth, setIsAuth] = useState(false);
  const [authFailMsg, setAuthFailMsg] = useState("");

  const [groups, setGroups] = React.useState([]);
  const [contacts, setContacts] = React.useState([]);

  const getGroupContacts = async () => {
    const result = await axios("/group/all");
    if (result.data.status !== 200){
      setIsAuth(false);
      setAuthFailMsg(result.data.errorMsg);
      window.location.href = "/login";
    } else {
      setIsAuth(true);
    }
    setGroups(result.data.allGroups);
    setContacts(result.data.allContacts);
  };


  useEffect(() => {
    getGroupContacts();
  }, []);
  

  return (
    <div>
      {isAuth && (
        <>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <GroupTitle/>
            <AddContactLink />
          </ButtonGroup>

          {/* <GroupTitle/> */}
          {/* <AddContactLink /> */}
          {groups &&
            contacts &&
            groups.map((group, index) => {
              if (group.isTop) {
                return (
                  <DisplayGroup
                    group={group}
                    contacts={contacts[index]}
                    key={`group${index}`}
                  />
                );
              }
            })}
            
          {groups &&
          contacts &&
          groups.map((group, index) => {
            if (!group.isTop) {
              return (
                <DisplayGroup
                  group={group}
                  contacts={contacts[index]}
                  key={`group${index}`}
                />
              );
            }
          })}
      
        </>
      )}

      {authFailMsg && <AuthFail msg={authFailMsg} />}
    </div>
  );
}


export default Contact;
