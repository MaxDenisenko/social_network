import dialogsReducer from './DialogsReducer';
import profileReducer from './ProfileReducer';
import sideBarReducer from './SideBarReducer';

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: 'sldkjflsdkjfldskjfld', likes: 2 },
        { id: 2, message: 'sldkjflsdkjfldskjfld', likes: 2 },
        { id: 3, message: 'sldkjflsdkjfldskjfld', likes: 2 },
        { id: 4, message: 'sldkjflsdkjfldskjfld', likes: 2 },
      ],
      newPostText: 'default value',
    },
    dialogsPage: {
      dialogs: [
        { id: 1, name: 'Max' },
        { id: 2, name: 'Ann' },
        { id: 3, name: 'Egor' },
        { id: 4, name: 'Gleb' },
      ],
      messages: [
        { id: 1, message: 'Hi', likesCount: 12 },
        { id: 2, message: 'How are you?', likesCount: 12 },
        { id: 3, message: 'Gooood', likesCount: 12 },
        { id: 4, message: 'Message first', likesCount: 12 },
        { id: 5, message: 'Message second', likesCount: 12 },
        { id: 6, message: 'Message third', likesCount: 12 },
      ],
      newMessageBody: '',
    },
    sidebar: {},
  },
  getState() {
    return this._state;
  },
  _callSubscriver() {
    console.log('State changed');
  },
  subscribe(observer) {
    this.rerenderEntireTree = observer;
  },
  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sideBarReducer(this._state.sidebar, action);

    this._callSubscriver(this._state);
  },
};

window.state = store;
export default store;
