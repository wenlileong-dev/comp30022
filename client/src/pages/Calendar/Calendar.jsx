import React, { useState } from "react";

import CalendarHeader from "../../components/Calendar/CalendarHeader";
import CalendarTitle from "../../components/Calendar/CalendarTitle";
import CalendarDays from "../../components/Calendar/CalendarDays";

function Calendar() {
  let today = new Date();
  let [month, setMonth] = useState(today.getMonth());
  let [year, setYear] = useState(today.getFullYear());
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
      <CalendarDays month={month} year={year} />
    </>
  );
}

export default Calendar;
