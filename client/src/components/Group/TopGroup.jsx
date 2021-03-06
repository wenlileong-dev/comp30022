import React from "react";
import axios from "axios";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

function TopGroup(props) {
  function topGroup() {
    const input = { id: props.groupID };
    axios.post(`api/group/top`, input).then((res) => {
      props.getGroupContacts();
    });
  }

  const GroupTop = (props) => {
    if (props.groupTop) {
      return (
        <>
          <Stack direction="row" spacing={1}>
            <IconButton
              aria-label="cancel-highlight"
              color="warning"
              onClick={topGroup}
            >
              <AutoAwesomeIcon />
            </IconButton>
          </Stack>
        </>
      );
    } else {
      return (
        <Stack direction="row" spacing={1}>
          <IconButton aria-label="highlight" onClick={topGroup}>
            <AutoAwesomeIcon />
          </IconButton>
        </Stack>
      );
    }
  };

  return <>{GroupTop(props)}</>;
}
export default TopGroup;
