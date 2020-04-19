import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import Layout from "../UI/Layout";
import IssueDetails from "../IssuesList/IssueDetails";

const IssueDetailsPage = () => {
  const { id } = useParams();
  const history = useHistory();

  return (
    <Layout>
      <IssueDetails id={id} />
      <Button onClick={history.goBack} size="sm" variant="dark">
        <FaArrowLeft /> back
      </Button>
    </Layout>
  );
};

export default IssueDetailsPage;
