import React from "react";

export default function NoteTimeline(props) {
  const displayNotes = (props) => {
    const { groups } = props;

    if (groups?.length > 0) {
      return groups.map((group, index) => {
        // console.log(groups);
        return (
          <div className="group" key={group._id}>
            <h3 className="group_name">{group.groupName}</h3>
            <p className="contact_number">{group.contactNumber}</p>
            <span className="note_fadeOut"></span>
          </div>
        );
      });
    } else {
      return <h3>Not group yet</h3>;
    }
  };
  return <>{displayNotes(props)}</>;
}
