import React, { useEffect, useState } from 'react';

const ProfileStatusHooks = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);
  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(!editMode);
  };
  const updateStatus = () => {
    setEditMode(!editMode);
    props.updateStatusThunkCreator(status);
  };
  const onStatusChange = (event) => {
    setStatus(event.target.value);
  };
  return (
    <div>
      {!editMode && (
        <div>
          <span onClick={activateEditMode}>{props.status}</span>
        </div>
      )}
      {editMode && (
        <div>
          <input autoFocus={true} onBlur={updateStatus} on onChange={onStatusChange} value={status} />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusHooks;
