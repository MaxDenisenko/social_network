import React from 'react';

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  };
  activateEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  };
  updateStatus = () => {
    this.setState({ editMode: !this.state.editMode });
    this.props.updateStatusThunkCreator(this.state.status);
  };
  onStatusChange = (event) => {
    this.setState({ status: event.target.value });
  };

  componentDidUpdate(prevState, prevProps) {
    if (prevState.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }
  }

  render() {
    return (
      <div>
        {!this.state.editMode ? (
          <div>
            <span onDoubleClick={this.activateEditMode}>{this.props.status || 'No status'}</span>
          </div>
        ) : (
          <div>
            <input onChange={this.onStatusChange} autoFocus value={this.state.status} onBlur={this.updateStatus}></input>
          </div>
        )}
      </div>
    );
  }
}
export default ProfileStatus;
