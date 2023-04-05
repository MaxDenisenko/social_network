import profileReducer, { addPostActionCreator } from './ProfileReducer';

if (
  ('length of posts should be incremented',
  () => {
    //1. test data
    let action = addPostActionCreator('istavmax');
    let state = {
      posts: [
        { id: 1, message: 'sldkjflsdkjfldskjfld', likes: 2 },
        { id: 2, message: 'sldkjflsdkjfldskjfld', likes: 2 },
        { id: 3, message: 'sldkjflsdkjfldskjfld', likes: 2 },
        { id: 4, message: 'sldkjflsdkjfldskjfld', likes: 2 },
      ],

      profile: null,
      status: '',
    };
    //2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.posts.length).toBe(5);
  })
);
