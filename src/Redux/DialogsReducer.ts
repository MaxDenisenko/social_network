const SEND_MESSAGE = 'SEND_MESSAGE';

type DialogType = {
  id: number;
  name: string;
};
type MessagesType = {
  id: number;
  message: string;
  likesCount: number;
};
let initialState = {
  dialogs: [
    { id: 1, name: 'Max' },
    { id: 2, name: 'Ann' },
    { id: 3, name: 'Egor' },
    { id: 4, name: 'Gleb' },
  ] as Array<DialogType>,
  messages: [
    { id: 1, message: 'Hi', likesCount: 12 },
    { id: 2, message: 'How are you?', likesCount: 12 },
    { id: 3, message: 'Gooood', likesCount: 12 },
    { id: 4, message: 'Message first', likesCount: 12 },
    { id: 5, message: 'Message second', likesCount: 12 },
    { id: 6, message: 'Message third', likesCount: 12 },
  ] as Array<MessagesType>,
  newMessageBody: '',
};
export type initialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any): initialStateType => {
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

type sendMessageActionCreatorType = {
  type: typeof SEND_MESSAGE;
  newMessageBody: string;
};

export const sendMessageActionCreator = (newMessageBody: string): sendMessageActionCreatorType => {
  return { type: SEND_MESSAGE, newMessageBody };
};

export default dialogsReducer;
