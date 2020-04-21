import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Issue from "./Issue";
import { FaSlidersH } from "react-icons/fa";
import { useIssuesByFilter } from "../../hooks/useIssuesByFilter";
import { useTotalIssuesByFilter } from "../../hooks/useTotalIssuesByFilter";
import { useDeleteIssue } from "../../hooks/useDeleteIssue";
import IssuesFilter from "./IssuesFilter";
import CurrentFilter from "./CurrentFilter";
import IssuesPagination from "./IssuesPagination";
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
  first: 5,
  skip: 0,
};

const IssuesList = () => {
  const [showPagination, setShowPagination] = useState(false);
  const [active, setActive] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [issuesFilter, setIssuesFilter] = useState(initialFilterValues);
  const [isIssueDeleted, setIsIssueDeleted] = useState(false);
  const onCompletedCb = (data) => {
    setShowPagination(
      totalIssuesData && totalIssuesData.totalIssuesByFilter.total > 4
    );
  };
  const { loading, error, data, refetch, fetchMore } = useIssuesByFilter(
    issuesFilter,
    onCompletedCb
  );
  const {
    data: totalIssuesData,
    refetch: totalRefetch,
  } = useTotalIssuesByFilter(issuesFilter);
  const { deleteIssue } = useDeleteIssue();

  const isMobile = useMedia({ maxWidth: 991 });

  useEffect(() => {
    if (isIssueDeleted) {
      refetch();
      totalRefetch();
      setActive(1);
    }
  }, [isIssueDeleted]);

  useEffect(() => {
    setIsIssueDeleted(false);
    refetch(issuesFilter);
    totalRefetch(issuesFilter);
    setActive(1);
  }, [issuesFilter]);

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

  const issuesList =
    data &&
    data.issuesByFilter.map((issue) => (
      <Issue key={issue.id} {...issue} removeIssue={handleDeleteIssue} />
    ));

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error.message}`;

  const handleClose = () => setShowFilter(false);

  const handlePaginationItemClicked = (pageNumber) => {
    setActive(pageNumber);
    const _skip = initialFilterValues.first * (pageNumber - 1);
    fetchMore({
      variables: {
        skip: _skip,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
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
        {showPagination && (
          <div className="d-flex justify-content-center mt-4">
            <IssuesPagination
              total={
                totalIssuesData && totalIssuesData.totalIssuesByFilter.total
              }
              perPage={initialFilterValues.first}
              active={active}
              fetchPageData={handlePaginationItemClicked}
            />
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
