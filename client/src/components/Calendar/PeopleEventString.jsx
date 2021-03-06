import React from "react";
import { Link } from "react-router-dom";
function PeopleEventString(props) {
  return (
    <React.Fragment>
      {props.person._id ? (
        <Link
          data-cy="people-link"
          to={{ pathname: `/contact/info`, state: { contact: props.person } }}
          style={{color:"blue"}}
        >
          {props.person.firstName} {props.person.lastName}{" "}
        </Link>
      ) : (
        <span>
          {props.person.firstName} {props.person.lastName}{" "}
        </span>
      )}
    </React.Fragment>
  );
}
export default PeopleEventString;
