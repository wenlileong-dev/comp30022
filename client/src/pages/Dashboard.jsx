import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardDays from "./../components/Dashboard/DashboardDays";
import DashboardContacts from "../components/Dashboard/DashboardContacts";
import AuthFail from "./../components/AuthFail";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function Dashboard() {
  let today = new Date();
  let [month, setMonth] = useState(today.getMonth()+1);
  let [year, setYear] = useState(today.getFullYear());
  const [events, setEvents] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [authFailMsg, setAuthFailMsg] = useState("");
  console.log(contacts)
  console.log(month)

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));

  //fetch the events of the month
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api/calendar/${month-1}/${year}`);
      if (result.data.status !== 200) {
        setIsAuth(false);
        setAuthFailMsg(result.data.errorMsg);
        window.location.href = "/login";
      } else {
        setIsAuth(true);
        // now we get events during the month
        setEvents(result.data.data);
      }
    };
    fetchData();
  }, [month, year]);

  useEffect(() => {
    const fetchData = async () => {
      const resultContacts = await axios(`/api/contacts/allContact/`);
      console.log(resultContacts)
      if (resultContacts.data.status !== 200) {
        setIsAuth(false);
        setAuthFailMsg(resultContacts.data.errorMsg);
        window.location.href = "/login";
      } else {
        setIsAuth(true);
        // now we get events during the month
        setContacts(resultContacts.data.data);
      }
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      {isAuth && (
        <>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8}>
              <Item>
               <p>Recent Events</p>
                {events.length > 0 && (<DashboardDays month={month} year={year} events={events} />)}
              </Item>
            </Grid>
            <Grid item xs={8}>
              <Item>
                <p>Recent Contacts</p>
                {contacts.length>0 && (<DashboardContacts  contacts={contacts} />)}
              </Item>
            </Grid>
          </Grid>

        </Box>
      </>)}
      {authFailMsg && <AuthFail msg={authFailMsg} />}
    </React.Fragment>
  );
}

export default Dashboard;

