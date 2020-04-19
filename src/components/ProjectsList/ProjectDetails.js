import React, { Fragment, useEffect, useState, useRef } from "react";
import PageTitle from "../PageTitle";
import { Modal, Spinner, Alert } from "react-bootstrap";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { useProjectDetails } from "../../hooks/useProjectDetails";
import Issue from "../IssuesList/Issue";
import AddTeamMemberForm from "../forms/AddTeamMemberForm";
import { useProjectRemoveTeamUser } from "../../hooks/useProjectRemoveTeamUser";
import { useDeleteIssue } from "../../hooks/useDeleteIssue";

const ProjectDetails = ({ id }) => {
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [errors, setErrors] = useState({});
  const { loading, error, data, refetch } = useProjectDetails(
    id,
    "updatedAt_DESC"
  );
  const { removeUserFromTeam } = useProjectRemoveTeamUser();
  const { deleteIssue } = useDeleteIssue();

  const deleteTeamUserIdRef = useRef(null);

  useEffect(() => {
    refetch(id);
  }, [id]);

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
            <h4>Issues:</h4>
            <div>{issues}</div>
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
