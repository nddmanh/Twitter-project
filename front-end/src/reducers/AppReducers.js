export default function reducer(state, action) {
  switch (action.type) {
    case "CURRENT_USER":
      return { ...state, user: action.payload };
    case "GET_ALL_POSTS":
      return { ...state, posts: action.payload };
    case "CREATE_ONE_POST":
      return { ...state, posts: [ ...state.posts, action.payload ] };
    case "UPDATE_ONE_POST":
      return { 
        ...state,
        posts: state.posts.map( (post) => 
          post._id === action.payload._id
            ? { ...post, ...action.payload }
            : post
        ),
      };
    case "DELETE_ONE_POST":
      return { 
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload._id ),
      };
      
    case "GET_COUNT_LIKE":
      return { ...state, likes: action.payload };
    case "LIKE_ONE_POST":
      return { ...state, likes: action.payload };
    case "UNLIKE_ONE_POST":
      return { ...state, likes: action.payload };
  
    default:
      return state;
  }
}