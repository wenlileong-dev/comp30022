import React, { useState, useEffect } from "react";
import axios from "axios";
import CalendarHeader from "./../components/Calendar/CalendarHeader";
import CalendarTitle from "./../components/Calendar/CalendarTitle";
import CalendarDays from "./../components/Calendar/CalendarDays";
import WeeklyCalendar from "../components/Calendar/WeeklyCalendar";
import mobileView from "../screenSize";
import AuthFail from "./../components/AuthFail";

import "./../components/Calendar/CalendarMonth.scss";
function Calendar() {
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

  //previous month
  const prevMonth = () => {
    if (month !== 0) {
      setMonth(month - 1);
    } else {
      setYear(year - 1);
      setMonth(11);
    }
  };

  return (
    <React.Fragment>
      {isAuth && (
        <>
          {!mobileView ? (
            <div className="calendar-container">
              <CalendarTitle
                month={month}
                year={year}
                nextMonth={nextMonth}
                prevMonth={prevMonth}
              />

              <div className="calendar">
                {!mobileView && <CalendarHeader />}
                {!mobileView && events.length > 0 && (
                  <CalendarDays month={month} year={year} events={events} />
                )}
              </div>
            </div>
          ) : (
            <>
              <CalendarTitle
                month={month}
                year={year}
                nextMonth={nextMonth}
                prevMonth={prevMonth}
              />
              <WeeklyCalendar events={events} month={month + 1} />
            </>
          )}
        </>
      )}
      {authFailMsg && <AuthFail msg={authFailMsg} />}
    </React.Fragment>
  );
}

export default Calendar;
