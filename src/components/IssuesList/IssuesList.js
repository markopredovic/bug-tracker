import React, { Fragment, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Issue from "./Issue";
import { FaSlidersH } from "react-icons/fa";
import { useIssuesByFilter } from "../../hooks/useIssuesByFilter";
import { useDeleteIssue } from "../../hooks/useDeleteIssue";
import IssuesFilter from "./IssuesFilter";
import CurrentFilter from "./CurrentFilter";
import useMedia from "use-media";

const initialFilterValues = {
  query: "",
  status: null,
  priority: null,
  assignedToId: "",
  projectId: "",
  orderBy: "updatedAt_DESC",
  assignedTo: "",
  project: "",
};

const IssuesList = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [issuesFilter, setIssuesFilter] = useState(initialFilterValues);
  const [isIssueDeleted, setIsIssueDeleted] = useState(false);
  const { loading, error, data, refetch } = useIssuesByFilter(issuesFilter);
  const { deleteIssue } = useDeleteIssue();

  const isMobile = useMedia({ maxWidth: 991 });

  useEffect(() => {
    setIsIssueDeleted(false);
    refetch(issuesFilter);
  }, [issuesFilter, refetch]);

  useEffect(() => {
    if (isIssueDeleted) refetch();
  }, [isIssueDeleted, refetch]);

  const handleDeleteIssue = async (id) => {
    setIsIssueDeleted(false);

    await deleteIssue({
      variables: {
        id,
      },
    });

    setIsIssueDeleted(true);
  };

  const submitFilter = (data) => {
    setIssuesFilter(data);
    setShowFilter(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error.message}`;

  const issuesList =
    data &&
    data.issuesByFilter.map((issue) => (
      <Issue key={issue.id} {...issue} removeIssue={handleDeleteIssue} />
    ));

  const handleClose = () => setShowFilter(false);

  return (
    <div className="d-lg-flex justify-content-between">
      {isMobile && (
        <div className="mb-3">
          <div className="mb-2">
            <span
              onClick={() => setShowFilter(true)}
              style={{ fontSize: "24px" }}
            >
              <FaSlidersH />
            </span>
          </div>
          <CurrentFilter filter={issuesFilter} getFilter={submitFilter} />
        </div>
      )}
      <div className="l-main order-2 flex-grow-1">
        {!isMobile && (
          <CurrentFilter filter={issuesFilter} getFilter={submitFilter} />
        )}
        {data && data.issuesByFilter.length > 0
          ? issuesList
          : "No issues in database"}
      </div>
      {isMobile ? (
        <Modal show={showFilter} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Filter issues</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <IssuesFilter
              getFilter={submitFilter}
              issuesFilter={issuesFilter}
            />
          </Modal.Body>
        </Modal>
      ) : (
        <div className="l-sidebar order-1 w-25 pr-4">
          <IssuesFilter getFilter={submitFilter} issuesFilter={issuesFilter} />
        </div>
      )}
    </div>
  );
};

export default IssuesList;
