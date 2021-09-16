import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./components/Main";
import AppReducer from "./reducers/AppReducers";
import React, { useCallback, useEffect, useReducer } from "react";
import AppContext from "./components/AppContext";
import axios from "axios";
import { apiUrl } from "./contexts/constant";

function App() {
  const initialState = {user: null, posts: [], comments: []};
  const [state, dispatch] = useReducer(AppReducer, initialState );
  const token = localStorage.getItem("token");

  const checkCurrentUser = useCallback(async () => {
    try {
      const option = {
        method: "get",
        url: `${apiUrl}/api/v1/auth`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios(option);
      if (response.data.data.user) {
        const { userName, userId } = response.data.data.user;
        dispatch({ type: "CURRENT_USER", payload: { userName, userId } })
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, token]);

  const getAllComments = useCallback(async ()=> {
    const token = localStorage.getItem("token");
    try {
      const option = {
        method: "get",
        url: `${apiUrl}/api/v1/comments`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios(option);
      const comments = response.data.data.comments;
      dispatch({ type: "GET_ALL_COMMENTS", payload: comments });
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    checkCurrentUser();
    if (token) {
      getAllComments();
    }
  }, [checkCurrentUser, getAllComments, token])

  return (
    <Router>
      <AppContext.Provider value={{ state, dispatch }}>
        <div className="container">
          <Header />
          <Switch>

            { state.user ? (
              <Route exact path="/">
                <Main />
              </Route>
            ) : (
              <>
                <Route exact path="/">
                  <h4 style={{ textAlign: "center"}}>Please login or register!</h4>
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/register">
                  <Register />
                </Route>
              </>
            )}
  
            <Route exact path="*">
              <h4 style={{ textAlign: "center"}}>Page not found!</h4>
            </Route>
          </Switch>
        </div>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
