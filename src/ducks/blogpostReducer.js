import axios from "axios";
const INITIAL_STATE = {
  user: null,
  allBlogposts: [],
  blogpost: []
};

const SET_USER = "SET_USER";
const GET_ALL_BLOGPOSTS = "GET_ALL_BLOGPOSTS";
const GET_BLOGPOST = "GET_BLOGPOST";

const CREATE_BLOGPOST = "CREATE_BLOGPOST";
const DELETE_BLOGPOST = "DELETE_BLOGPOST";
const EDIT_BLOGPOST = "EDIT_BLOGPOST";

//handling action
export default function blogpostReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case `${GET_ALL_BLOGPOSTS}_FULFILLED`:
      return { ...state, allBlogposts: action.payload };
    case GET_BLOGPOST:
      return { ...state, blogpost: action.payload };
    case `${CREATE_BLOGPOST}_FULFILLED`:
      return { ...state };
    case `${DELETE_BLOGPOST}_FULFILLED`:
      return { ...state };
    case `${EDIT_BLOGPOST}_FULFILLED`:
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

export function getAllBlogposts() {
  return {
    type: GET_ALL_BLOGPOSTS,
    payload: axios
      .get("/api/blogposts")
      .then(res => {
        return res.data;
      })
      .catch(error => console.log("Error in getAllBlogposts", error))
  };
}

export function getOne(id) {
  return {
    type: GET_BLOGPOST,
    payload: id
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
      .post("/api/blogpost", {
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

export function editBlogPost(date, title, image_url, blurb, itinerary, id) {
  return {
    type: EDIT_BLOGPOST,
    payload: axios
      .put(`/api/blogpost/${id}`, {
        date,
        title,
        image_url,
        blurb,
        itinerary
      })
      .then(() => (window.location.pathname = "/dashboard"))
      .catch(error => console.log("error in editing blogpost", error))
  };
}
