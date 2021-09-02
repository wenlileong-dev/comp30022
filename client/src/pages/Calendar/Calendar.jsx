import React, { useState, useEffect } from "react";
import axios from "axios";
import CalendarHeader from "../../components/Calendar/CalendarHeader";
import CalendarTitle from "../../components/Calendar/CalendarTitle";
import CalendarDays from "../../components/Calendar/CalendarDays";

function Calendar() {
  let today = new Date();
  let [month, setMonth] = useState(today.getMonth());
  let [year, setYear] = useState(today.getFullYear());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api/calendar/${month}/${year}`);
      setEvents(result.data.data);
    };
    fetchData();
  }, [month]);

  const nextMonth = () => {
    if (month !== 11) {
      setMonth(month + 1);
    } else {
      setYear(year + 1);
      setMonth(0);
    }
  };

  const prevMonth = () => {
    if (month !== 0) {
      setMonth(month - 1);
    } else {
      setYear(year - 1);
      setMonth(11);
    }
  };
  return (
    <>
      <CalendarTitle
        month={month}
        year={year}
        nextMonth={nextMonth}
        prevMonth={prevMonth}
      />
      <CalendarHeader />
      {events.length > 0 && (
        <CalendarDays month={month} year={year} events={events} />
      )}
    </>
  );
}

export default Calendar;
