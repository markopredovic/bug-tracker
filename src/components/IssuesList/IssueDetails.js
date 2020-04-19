import React, { useEffect, Fragment, useState } from "react";
import {
  Button,
  Form,
  Modal,
  Alert,
  Badge,
  ProgressBar,
} from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import { useIssueDetails } from "../../hooks/useIssueDetails";
import { useForm } from "../../hooks/useForm";
import { useCreateComment } from "../../hooks/useCreateComment";
import { useUpdateIssue } from "../../hooks/useUpdateIssue";
import EditIssue from "./EditIssue";
import InlineMessage from "../messages/InlineMessage";

const IssueDetails = ({ id }) => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentAdded, setCommentAdded] = useState(false);
  const [issueEdited, setIssueEdited] = useState(false);
  const [addingComment, setAddingComment] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorsComment, setErrorsComment] = useState({});
  const [errorsEdit, setErrorsEdit] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const { loading, error, data, refetch } = useIssueDetails(id);
  const [commentData, setCommentData, handleChange] = useForm({
    description: "",
    spent: "",
  });
  const { createComment } = useCreateComment();
  const { updateIssue } = useUpdateIssue();

  useEffect(() => {
    refetch(id);
  }, [id]);

  useEffect(() => {
    if (commentAdded) {
      setCommentAdded(false);
      setCommentData({
        description: "",
        spent: "",
      });
      refetch();
    }
  }, [commentAdded]);

  useEffect(() => {
    if (issueEdited) {
      setIssueEdited(false);
      refetch();
    }
  }, [issueEdited]);

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error.message}`;

  const issueData = data && data.issue;

  const handleClose = () => setShowCommentModal(false);

  const _validateCommentForm = () => {
    const _errors = {};

    if (commentData.description.trim() === "") {
      _errors.description = "Required field";
    }

    if (isNaN(parseInt(commentData.spent))) {
      _errors.spent = "Not a number";
    }

    return _errors;
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    setErrorsComment({});
    const _errors = _validateCommentForm();

    if (Object.keys(_errors).length > 0) {
      setErrorsComment(_errors);
    } else {
      try {
        setAddingComment(true);
        await createComment({
          variables: {
            issueId: id,
            ...commentData,
            spent: parseFloat(commentData.spent) * 60,
          },
        });
        setAddingComment(false);
        setCommentAdded(true);
        setShowCommentModal(false);
      } catch (e) {
        const graphqlError = e.message.replace("GraphQL error: ", "");
        setErrors({ graphqlError });
      } finally {
        setAddingComment(false);
      }
    }
  };

  const handleIssueEdit = async (editIssueData) => {
    const percentDoneParse = !!editIssueData.percentDone
      ? parseFloat(editIssueData.percentDone)
      : 0;

    const updatedIssueData = {
      id: issueData.id,
      title: editIssueData.title,
      description: editIssueData.description,
      estimation: editIssueData.estimation * 60,
      status: editIssueData.status,
      priority: editIssueData.priority,
      percentDone: percentDoneParse,
      assignedToId: !!editIssueData.assignedToId
        ? editIssueData.assignedToId
        : "Unassigned",
    };
    try {
      setErrorsEdit({});
      await updateIssue({
        variables: {
          ...updatedIssueData,
        },
      });
      setIssueEdited(true);
    } catch (e) {
      const graphqlError = e.message.replace("GraphQL error: ", "");
      setErrorsEdit({ graphqlError });
    }
  };

  return (
    <Fragment>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>{issueData.title}</h3>
        <Button onClick={() => setShowEditModal(true)} size="sm">
          <FaPen /> Edit
        </Button>
      </div>
      {!!errorsEdit.graphqlError && (
        <Alert variant="danger">{errorsEdit.graphqlError}</Alert>
      )}
      <div className="m-issue-details">
        <div className="mb-4 m-issue-description">{issueData.description}</div>
        <div className="m-issue-metadata p-2 p-md-4 mb-4">
          <div className="mb-2">
            <strong>Estimation:</strong> {issueData.estimation / 60}h
          </div>
          <div className="mb-2">
            <Badge
              className="mr-2"
              variant={
                issueData.status === "NEW"
                  ? "primary"
                  : issueData.status === "IN_PROGRESS"
                  ? "success"
                  : issueData.status === "PENDING"
                  ? "warning"
                  : "danger"
              }
            >
              Status: {issueData.status}
            </Badge>
          </div>
          <div className="mb-2">
            <Badge
              variant={
                issueData.priority === "HIGH"
                  ? "danger"
                  : issueData.priority === "NORMAL"
                  ? "primary"
                  : "warning"
              }
            >
              Priority: {issueData.priority}
            </Badge>
          </div>
          <div className="mb-2">
            <strong>Spent:</strong>{" "}
            {!!issueData.spent ? (issueData.spent / 60).toFixed(1) : 0}h
          </div>
          <div className="mb-2 d-flex align-items-center">
            <span className="mr-2">
              <strong>%Done:</strong>
            </span>
            <ProgressBar
              className="w-50"
              variant="info"
              now={!!issueData.percentDone ? issueData.percentDone : 0}
              label={
                !!issueData.percentDone ? `${issueData.percentDone}%` : "0%"
              }
            />
          </div>
          <div className="">
            <span>
              <strong>Assigned to:</strong>
              {!!issueData.assignedTo
                ? issueData.assignedTo.name
                : "Unassigned"}
            </span>
          </div>
        </div>
        <h4 className="mb-3">Comments:</h4>
        <div>
          {issueData.comments.map((comment) => (
            <Fragment key={comment.id}>
              <div className="mb-2">
                <small className="text-info">
                  {new Date(Date(comment.createdAt)).toLocaleDateString()}
                </small>
                <p>{comment.description}</p>
              </div>
              <hr />
            </Fragment>
          ))}
        </div>
        <div>
          <Button
            variant="primary"
            onClick={() => setShowCommentModal(true)}
            className="mb-5"
          >
            Add comment
          </Button>
          <Modal show={showCommentModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {!!errors.graphqlError && (
                <Alert variant="danger">{errors.graphqlError}</Alert>
              )}
              <Form onSubmit={handleSubmitComment}>
                <Form.Group controlId="comment.description">
                  <Form.Label>
                    <strong className="m-required">Description</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="4"
                    name="description"
                    value={commentData.description}
                    onChange={(e) => handleChange(e)}
                  />
                  {!!errorsComment.description && (
                    <InlineMessage>{errorsComment.description}</InlineMessage>
                  )}
                </Form.Group>

                <Form.Group controlId="comment.spent">
                  <Form.Label>
                    <strong className="m-required">Spent</strong> (in hours)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="enter spent time"
                    name="spent"
                    value={commentData.spent}
                    onChange={(e) => handleChange(e)}
                  />
                  {!!errorsComment.spent && (
                    <InlineMessage>{errorsComment.spent}</InlineMessage>
                  )}
                </Form.Group>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="secondary"
                    onClick={handleClose}
                    className="mr-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={addingComment}
                  >
                    {addingComment ? "Adding..." : "Add"}
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
      <EditIssue
        issueData={{
          ...issueData,
          estimation: issueData.estimation / 60,
          percentDone: !!issueData.percentDone ? issueData.percentDone : 0,
          assignedToId: !!issueData.assignedTo
            ? issueData.assignedTo.id
            : "Unassigned",
        }}
        show={showEditModal}
        handleEdit={handleIssueEdit}
        issueTitle={issueData.title}
        closeEditModal={() => setShowEditModal(false)}
      />
    </Fragment>
  );
};

export default IssueDetails;
