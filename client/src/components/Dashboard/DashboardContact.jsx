import React from "react";
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";
function DashboardDay(props) {
  // let [isPopupOpen, setIsPopupOpen] = useState(false);
  // let [isShowOne, setIsShowOne] = useState(false);

  // function handleOpen(event) {
  //   setIsPopupOpen(true);
  //   // setIsShowOne(true);
  // }
  // function handleShow(event){
  //   setIsShowOne(true)
  // }
  // function handleClose(event) {
  //   event.stopPropagation();
  //   setIsPopupOpen(false);
  //   setIsShowOne(false);
  // }
  // console.log(props.firstName)
  return (
    <React.Fragment>
      <div>
      <Link
                
                to={{pathname:`/contact/info`,
                state:{contact:props.contacts}}}
            >
            {props.contacts.firstName} {props.contacts.lastName}
          </Link>
          <Divider/>
      </div>
    </React.Fragment>
  );
}

export default DashboardDay;