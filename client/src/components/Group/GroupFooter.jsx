import React, { useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

function GroupFooter(props) {
  function deleteGroup() {
    const input = { id: props.groupID };
    axios.post(`/group/delete`, input).then((res) => {
      props.getGroupContacts();
    });
  }

  return (
    <React.Fragment>
      <Stack direction="row" spacing={1}>
        <IconButton aria-label="delete" onClick={deleteGroup}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </React.Fragment>
  );
}
export default GroupFooter;
