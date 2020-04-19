import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../UI/Layout";
import PageTitle from "../PageTitle";
import AppContext from "../../context/appContext";

const LogoutPage = () => {
  const context = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    context.userLoggedOut();
    history.push("/");
  }, []);

  return (
    <Layout>
      <PageTitle title="Logout" />
      <p>You are logging out ...</p>
    </Layout>
  );
};

export default LogoutPage;
