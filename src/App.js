import React, { useEffect } from "react";
import AppContext from "./context/appContext";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt from "jsonwebtoken";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/pages/HomePage";
import SignUpPage from "./components/pages/SignUpPage";
import LoginPage from "./components/pages/LoginPage";
import LogoutPage from "./components/pages/LogoutPage";
import UserProfilePage from "./components/pages/UserProfilePage";
import AddProjectsPage from "./components/pages/AddProjectsPage";
import ProjectsPage from "./components/pages/ProjectsPage";
import ProjectDetailsPage from "./components/pages/ProjectDetailsPage";
import IssuesPage from "./components/pages/IssuesPage";
import IssueDetailsPage from "./components/pages/IssueDetailsPage";
import AddIssuePage from "./components/pages/AddIssuePage";
import { useApp } from "./hooks/useApp";
import "./css/bootstrap.flatly.min.css";
import "./App.css";
import client from "./apollo-client";

function App() {
  const {
    token,
    user,
    posts,
    userLoggedIn,
    userLoggedOut,
    updateUser,
  } = useApp();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!!token) {
      const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
      const user = {
        id: decoded.userId,
        name: decoded.userName,
      };
      userLoggedIn({ user, token });
    }
  }, []);

  return (
    <AppContext.Provider
      value={{ token, user, posts, userLoggedIn, userLoggedOut, updateUser }}
    >
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/projects" exact component={ProjectsPage} />
            <Route path="/profile" exact component={UserProfilePage} />
            <Route path="/projects/new" exact component={AddProjectsPage} />
            <Route path="/projects/:id" exact component={ProjectDetailsPage} />
            <Route path="/issues" exact component={IssuesPage} />
            <Route path="/issues/new" exact component={AddIssuePage} />
            <Route path="/issues/:id" exact component={IssueDetailsPage} />
            <Route path="/signup" exact component={SignUpPage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/logout" exact component={LogoutPage} />
          </Switch>
          <Footer />
        </Router>
      </ApolloProvider>
    </AppContext.Provider>
  );
}

export default App;
