import React, { Fragment, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../PageTitle";
import {
  Modal,
  Spinner,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from "react-bootstrap";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { useProjectDetails } from "../../hooks/useProjectDetails";
import Issue from "../IssuesList/Issue";
import AddTeamMemberForm from "../forms/AddTeamMemberForm";
import { useProjectRemoveTeamUser } from "../../hooks/useProjectRemoveTeamUser";
import { useDeleteIssue } from "../../hooks/useDeleteIssue";
import { useTotalIssuesByFilter } from "../../hooks/useTotalIssuesByFilter";

const ProjectDetails = ({ id }) => {
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [issueStatus, setIssueStatus] = useState(null);
  const [moreLoading, setMoreLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const { loading, error, data, refetch, fetchMore } = useProjectDetails(
    id,
    issueStatus,
    "updatedAt_DESC"
  );
  const { removeUserFromTeam } = useProjectRemoveTeamUser();
  const { deleteIssue } = useDeleteIssue();
  const {
    data: totalIssuesData,
    refetch: totalIssuesRefetch,
  } = useTotalIssuesByFilter({
    status: issueStatus,
    projectId: id,
  });

  const deleteTeamUserIdRef = useRef(null);
  const fetchMoreCounterRef = useRef(0);

  useEffect(() => {
    refetch(id);
  }, [id]);

  useEffect(() => {
    refetch(id);
  }, [issueStatus]);

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error.message}`;

  const projectDetails = data && data.project;

  const team = projectDetails.team.map((user) => (
    <div key={user.id} className="mb-1">
      <span className="mr-2">{user.position}:</span>
      <span className="mr-2">{user.name}</span>
      <span
        className="text-danger"
        onClick={() => handleRemoveFromTeam(user.id)}
        style={{ cursor: "pointer" }}
      >
        <FaMinusCircle className="mr-2" />
        {deleteTeamUserIdRef.current === user.id && (
          <Spinner animation="border" size="sm" />
        )}
      </span>
    </div>
  ));

  const removeIssue = async (id) => {
    await deleteIssue({
      variables: { id },
    });
    refetch(id);
    totalIssuesRefetch();
  };

  const issues = projectDetails.issues.map((issue) => (
    <Issue key={issue.id} {...issue} removeIssue={removeIssue} />
  ));

  const showAddModal = () => setShowAddTeamModal(true);
  const handleClose = () => setShowAddTeamModal(false);

  const handleAddTeamMember = () => {
    setShowAddTeamModal(false);
  };

  const handleRemoveFromTeam = async (userId) => {
    try {
      deleteTeamUserIdRef.current = userId;
      await removeUserFromTeam({
        variables: {
          id,
          userId,
        },
      });
      deleteTeamUserIdRef.current = null;
    } catch (e) {
      deleteTeamUserIdRef.current = null;
      const graphqlError = e.message.replace("GraphQL error: ", "");
      setErrors({ graphqlError });
    } finally {
      deleteTeamUserIdRef.current = null;
    }
  };

  const handleStatusChange = (status) => {
    setAllLoaded(false);
    setIssueStatus(status);
  };

  const handleLoadMore = async () => {
    console.log("load more ...");
    setMoreLoading(true);
    fetchMoreCounterRef.current += 1;

    await fetchMore({
      variables: {
        first: 5 + 5 * fetchMoreCounterRef.current,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        const totalLoaded = fetchMoreResult.project.issues.length;
        if (totalLoaded === totalIssuesData.totalIssuesByFilter.total)
          setAllLoaded(true);

        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          project: { ...prev.project, ...fetchMoreResult.project },
        });
      },
    });
    setMoreLoading(false);
  };

  return (
    <Fragment>
      {projectDetails && (
        <div className="m-project-details">
          <PageTitle title={projectDetails.name} />
          {!!errors.graphqlError && (
            <Alert variant="danger">{errors.graphqlError}</Alert>
          )}
          <div className="m-project-description mb-4">
            {projectDetails.description}
          </div>
          <div className="mb-4 m-team">
            <h4>Team:</h4>
            {team}
            <span
              className="text-success"
              style={{ cursor: "pointer" }}
              onClick={showAddModal}
            >
              <FaPlusCircle />
            </span>
          </div>
          <div>
            {totalIssuesData &&
            totalIssuesData.totalIssuesByFilter.total > 0 ? (
              <div className="mb-3 d-flex align-items-center justify-content-between">
                <h4>Issues:</h4>
                <ToggleButtonGroup
                  type="radio"
                  name="status"
                  value={issueStatus}
                  onChange={handleStatusChange}
                >
                  <ToggleButton value="NEW">New</ToggleButton>
                  <ToggleButton value="IN_PROGRESS">In Progress</ToggleButton>
                  <ToggleButton value="PENDING">Pending</ToggleButton>
                  <ToggleButton value="CLOSED">Closed</ToggleButton>
                </ToggleButtonGroup>
              </div>
            ) : (
              <>
                <span className="mr-3">No issue on this project.</span>
                <Link to={"/issues/new"}>Add issue</Link>
              </>
            )}
            <div className="mb-4">{issues}</div>
            {totalIssuesData.totalIssuesByFilter.total > 5 && !allLoaded && (
              <div className="d-flex justify-content-center">
                <Button onClick={handleLoadMore}>
                  <span className="mr-2">Load more</span>
                  {moreLoading && (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      <Modal show={showAddTeamModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add to team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddTeamMemberForm
            projectId={id}
            submitForm={handleAddTeamMember}
            closeForm={() => setShowAddTeamModal(false)}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default ProjectDetails;
