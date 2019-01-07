import axios from "axios";

const INITIAL_STATE = {
  user: null,
  blogpostsList: [],
  admin: {}
};

const SET_USER = "SET_USER";
const SET_ADMIN = "SET_ADMIN";
const SET_BLOGPOSTS = "SET_BLOGPOSTS";
const CREATE_BLOGPOST = "CREATE_BLOGPOST";
const DELETE_BLOGPOST = "DELETE_BLOGPOST";
const EDIT_BLOGPOST = "EDIT_BLOGPOST";

//handling action
export default function blogpostReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_ADMIN:
      return { ...state, admin: action.payload };
    case `${SET_BLOGPOSTS}_PENDING`:
      console.log("action", action.payload);
      return { ...state, blogpostsList: action.payload };
    case CREATE_BLOGPOST:
      return { ...state };
    case DELETE_BLOGPOST:
      return { ...state };
    case EDIT_BLOGPOST:
      return { ...state };
    default:
      return { ...state };
  }
}

//dispatching actions
export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}

export function admin(admin) {
  return {
    type: SET_ADMIN,
    payload: admin
  };
}

export function getAll() {
  return {
    type: SET_BLOGPOSTS,
    payload: axios
      .get("/api/blogposts")
      .then(res => {
        return res.data;
      })
      .catch(error => console.log("Error in getAll", error))
  };
}

export function createBlogPost(
  date,
  title,
  image_url,
  blurb,
  itinerary,
  user,
  id
) {
  return {
    type: CREATE_BLOGPOST,
    payload: axios
      .post("/api/blogposts", {
        date,
        title,
        image_url,
        blurb,
        itinerary,
        user,
        id
      })
      .then(() => (window.location.pathname = "/dashboard"))
      .catch(err => console.log("error in creating blogpost", err))
  };
}

export function deleteBlogPost(id) {
  return {
    type: DELETE_BLOGPOST,
    payload: axios
      .delete(`/api/blogpost/${id}`)
      .then(() => (window.location.pathname = "/dashboard"))
      .catch(err => console.log("error in deleteing blogpost", err))
  };
}

export function editBlogPost(
  date,
  title,
  image_url,
  blurb,
  itinerary,
  user,
  id
) {
  return {
    type: EDIT_BLOGPOST,
    payload: axios
      .put(`/api/blogpost/${id}`, {
        date,
        title,
        image_url,
        blurb,
        itinerary,
        user,
        id
      })
      .then(() => (window.location.pathname = "/dashboard"))
      .catch(error => console.log("error in editing blogpost", error))
  };
}
