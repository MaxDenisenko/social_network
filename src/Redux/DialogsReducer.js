const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE: {
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: 7, message: body, likesCount: 1 }],
      };
    }
    default:
      return state;
  }
};

export const sendMessageActionCreator = (newMessageBody) => {
  return { type: SEND_MESSAGE, newMessageBody };
};

export default dialogsReducer;
