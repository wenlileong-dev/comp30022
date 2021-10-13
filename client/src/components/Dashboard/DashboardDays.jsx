import React from "react";

import DashboardDay from "./DashboardDay";

function DashboardDays(props) {
  let firstDay = new Date(props.year, props.month, 1);
  console.log(props.events);

  let today = new Date().getDate();
  // let today = 30;
  // console.log(today);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  };
  let daysInMonth = getDaysInMonth(new Date(props.year, props.month));
  // 31
  console.log(daysInMonth)


  function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }
  //29,30,31
  var result = range(today, daysInMonth);
  console.log(result);
  var final =result.slice(-1);
  console.log(final[0]);
  console.log(props.events[final[0]])
  console.log(props.events[final[0]+1])
  if(result)

  return (
    <div>
        {/* [...Array(firstDay.getDay())] */}
      {/* {result.map((day, index) => {
        return <DashboardDay day="" key={`a${index}`} />;
      })} */}
      {result.length>4 && result.slice(0,4).map((day, index) => {
        console.log(day)
        return (
        // <p>1</p>
          <DashboardDay
            day={day}
            month={props.month}
            year={props.year}
            event={props.events[day-1]}
            key={index}
          />
        );
      })}

      {result.length==4 && result.map((day, index) => {
        console.log(props.events[day])
        return (
        // <p>1</p>
          <DashboardDay
            day={day}
            month={props.month}
            year={props.year}
            event={props.events[day-1]}
            key={index}
          />
        );
        
      })}
      {result.length==3 && result.map((day, index) => {
        console.log(props)
        return (
          <>
          {/* <p>1111111</p> */}
          <DashboardDay
            day={day}
            month={props.month}
            year={props.year}
            event={props.events[day-1]}
            key={index}
          />
          </>
        );
      }) 
      // && <DashboardDay
      //         day={1}
      //         month={props.month+1}
      //         year={props.year}
      //         event={props.events[final]}
      //         // key={index}
      //       />
      }
      {result.length==3 && props.month!=12 &&  <DashboardDay
              day={1}
              month={props.month+1}
              year={props.year}
              event={props.events[final]}
              // key={index}
            />
      }
      {result.length==3 && props.month==12 &&  <DashboardDay
              day={1}
              month={1}
              year={props.year+1}
              event={props.events[final]}
              // key={index}
            />
      }
      {result.length==2 && result.map((day, index) => {
        console.log(props.events[day])
        return (
        // <p>1</p>
          <DashboardDay
            day={day}
            month={props.month}
            year={props.year}
            event={props.events[day-1]}
            key={index}
          />
        );
      }) 
      }
      {result.length==2  && props.month!=12 &&<DashboardDay
              day={1}
              month={props.month+1}
              year={props.year}
              event={props.events[final]}
              // key={index}
            />
      }
      {result.length==2 
            && props.month!=12 &&<DashboardDay
              day={2}
              month={props.month+1}
              year={props.year}
              event={props.events[final[0]+1]}
              // key={index}
            />
      }
      {result.length==2  && props.month==12 &&<DashboardDay
              day={1}
              month={1}
              year={props.year+1}
              event={props.events[final]}
              // key={index}
            />
      }
      {result.length==2 
            && props.month==12 &&<DashboardDay
              day={2}
              month={1}
              year={props.year+1}
              event={props.events[final[0]+1]}
              // key={index}
            />
      }
      {result.length==1 && result.map((day, index) => {
        console.log(props.events[day])
        return (
        // <p>1</p>
          <DashboardDay
            day={day}
            month={props.month}
            year={props.year}
            event={props.events[day-1]}
            key={index}
          />
        );
      }) 
      }
      {result.length==1  && props.month!=12 &&<DashboardDay
              day={1}
              month={props.month+1}
              year={props.year}
              event={props.events[final]}
              // key={index}
            />
      }
      {result.length==1 
            && props.month!=12 &&<DashboardDay
              day={2}
              month={props.month+1}
              year={props.year}
              event={props.events[final[0]+1]}
              // key={index}
            />
      }
      {result.length==1 
            && props.month!=12 &&<DashboardDay
              day={3}
              month={props.month+1}
              year={props.year}
              event={props.events[final[0]+2]}
              // key={index}
            />
      }
      {result.length==1  && props.month==12 &&<DashboardDay
              day={1}
              month={1}
              year={props.year+1}
              event={props.events[final]}
              // key={index}
            />
      }
      {result.length==1 
            && props.month==12 &&<DashboardDay
              day={2}
              month={1}
              year={props.year+1}
              event={props.events[final[0]+1]}
              // key={index}
            />
      }
      {result.length==1 
            && props.month==12 &&<DashboardDay
              day={3}
              month={1}
              year={props.year+1}
              event={props.events[final[0]+2]}
              // key={index}
            />
      }
      
    </div>
  );
}

export default DashboardDays;