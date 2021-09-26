import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardTitle from "./../components/Dashboard/DashboardTitle";
import DashboardDays from "./../components/Dashboard/DashboardDays";
import AuthFail from "./../components/AuthFail";
function Dashboard() {
  let today = new Date();
  let [month, setMonth] = useState(today.getMonth());
  let [year, setYear] = useState(today.getFullYear());
  const [events, setEvents] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [authFailMsg, setAuthFailMsg] = useState("");

  //fetch the events of the month
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api/calendar/${month}/${year}`);
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

  //next month
  const nextMonth = () => {
    if (month !== 11) {
      setMonth(month + 1);
    } else {
      setYear(year + 1);
      setMonth(0);
    }
  };

  
  return (
    <React.Fragment>
      
      {isAuth && (
        <>
        <p>Recent Events</p>
          {/* <DashboardTitle
            month={month}
            year={year}
            nextMonth={nextMonth}
          />

          {!mobileView && events.length > 0 && (
            <CalendarDays month={month} year={year} events={events} />
          )}
          {mobileView && <WeeklyCalendar events={events} month={month + 1} />} */}
        </>
      )}
      {events.length > 0 && (<DashboardDays month={month} year={year} events={events} />)}
      {authFailMsg && <AuthFail msg={authFailMsg} />}
    </React.Fragment>
  );
}

export default Dashboard;

