import { connect } from 'react-redux';
import { compose } from 'redux';
import { WithAuthNavigate } from '../../HOC/WithAuthNavigate';
import { sendMessageActionCreator } from '../../Redux/DialogsReducer';
import Dialogs from './Dialogs';

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) => {
      dispatch(sendMessageActionCreator(newMessageBody));
    },
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), WithAuthNavigate)(Dialogs);
