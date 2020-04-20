import React, { useRef, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Issue from "./Issue";
import { FaSlidersH, FaChevronRight, FaChevronLeft } from "react-icons/fa";
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
  first: 10,
  skip: 0,
};

const IssuesList = () => {
  const cursorRef = useRef(0);
  const [isNextDisabled, setNextDisabled] = useState(false);
  const [isPreviousDisabled, setPreviousDisabled] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [issuesFilter, setIssuesFilter] = useState(initialFilterValues);
  const [isIssueDeleted, setIsIssueDeleted] = useState(false);
  const { loading, error, data, refetch, fetchMore } = useIssuesByFilter(
    issuesFilter
  );
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

  let paginationDisable = false;

  useEffect(() => {
    paginationDisable =
      data && data.issuesByFilter.length < initialFilterValues.first;
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error.message}`;

  const issuesList =
    data &&
    data.issuesByFilter.map((issue) => (
      <Issue key={issue.id} {...issue} removeIssue={handleDeleteIssue} />
    ));

  const handleClose = () => setShowFilter(false);

  const handleFetchNext = () => {
    cursorRef.current += 1;
    fetchMore({
      variables: {
        skip: 10 * cursorRef.current,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (
          fetchMoreResult.issuesByFilter.length > 0 &&
          fetchMoreResult.issuesByFilter.length < 10
        ) {
          setNextDisabled(true);
          setPreviousDisabled(false);
          return fetchMoreResult;
        } else if (fetchMoreResult.issuesByFilter.length === 0) {
          return prev.issuesByFilter;
        }

        setPreviousDisabled(false);
        return fetchMoreResult;
      },
    });
  };

  const handleFetchPrevious = () => {
    cursorRef.current -= 1;
    cursorRef.current = cursorRef.current < 0 ? 0 : cursorRef.current;
    fetchMore({
      variables: {
        skip: 10 * cursorRef.current,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        setNextDisabled(false);
        if (cursorRef.current === 0) {
          setPreviousDisabled(true);
        }
        return fetchMoreResult;
      },
    });
  };

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
        {!paginationDisable && (
          <div className="d-flex justify-content-end mt-4">
            <Button
              onClick={handleFetchPrevious}
              style={{ fontSize: "24px" }}
              disabled={isPreviousDisabled}
              className="mr-2 d-flex align-items-center"
            >
              <FaChevronLeft />
            </Button>
            <Button
              onClick={handleFetchNext}
              style={{ fontSize: "24px" }}
              disabled={isNextDisabled}
              className="d-flex align-items-center"
            >
              <FaChevronRight />
            </Button>
          </div>
        )}
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
