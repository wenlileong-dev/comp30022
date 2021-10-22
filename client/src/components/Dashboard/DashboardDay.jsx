import React from "react";
import Typography from "@mui/material/Typography";
import DashboardPopup from "./DashboardPopup";

function DashboardDay(props) {
  // let [isPopupOpen, setIsPopupOpen] = useState(false);
  // let [isShowOne, setIsShowOne] = useState(false);

  // function handleOpen(event) {
  //   setIsPopupOpen(true);
  // }
  // function handleShow(event){
  //   setIsShowOne(true)
  // }
  function handleClose(event) {
    event.stopPropagation();
    // setIsPopupOpen(false);
    // setIsShowOne(false);
  }
  // console.log(props)
  return (
    <React.Fragment>
      <div>
        {new Date().getDate() === props.day &&
        new Date().getMonth() === props.month ? (
          <Typography gutterBottom variant="h4" component="div">
            {new Date().getDate()}/{props.month}/{props.year}
          </Typography>
        ) : (
          <Typography gutterBottom variant="h6" component="div">
            {props.day}/{props.month}/{props.year}
          </Typography>
        )}

        <div>
          {props.event.length === 0 && (
            <Typography variant="subtitle2" component="div">
              No event for this day
            </Typography>
          )}
          {props.event &&
            props.event.map((event, index) => {
              return (
                <div>
                  <DashboardPopup
                    // renderType="day-events"
                    key={index}
                    events={event}
                    handleClose={handleClose}
                    year={props.year}
                    month={props.month}
                    day={props.day}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
}

export default DashboardDay;
