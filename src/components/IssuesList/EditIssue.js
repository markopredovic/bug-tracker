import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import { useUsers } from "../../hooks/useUsers";

const EditIssue = ({
  issueData,
  show,
  handleEdit,
  issueTitle,
  closeEditModal,
}) => {
  const [editIssueData, , handleChange] = useForm(issueData);
  const {
    loading: usersLoading,
    error: usersError,
    data: usersData,
    refetch: usersRefetch,
  } = useUsers();

  useEffect(() => {
    usersRefetch();
  }, []);

  if (usersLoading) return <div>Loading...</div>;
  if (usersError) return `Error! ${usersError.message}`;

  const assignedToId =
    usersData &&
    usersData.users.map((user) => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ));

  const handleClose = () => {
    closeEditModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleEdit(editIssueData);
    closeEditModal();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit issue: {issueTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="editIssue.title">
            <Form.Label>
              <strong>Title</strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Edit title"
              name="title"
              value={editIssueData.title}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="editIssue.descritpion">
            <Form.Label>
              <strong>Description</strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              placeholder="Edit description"
              name="description"
              value={editIssueData.description}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="editIssue.estimation">
            <Form.Label>
              <strong>Estimation</strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Edit estimation"
              name="estimation"
              value={editIssueData.estimation}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="editIssue.status">
            <Form.Label>
              <strong>Status</strong>
            </Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={editIssueData.status}
              onChange={(e) => handleChange(e)}
            >
              <option value="NEW">New</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="PENDING">Pending</option>
              <option value="CLOSED">Closed</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="editIssue.priority">
            <Form.Label>
              <strong>Priority</strong>
            </Form.Label>
            <Form.Control
              as="select"
              name="priority"
              value={editIssueData.priority}
              onChange={(e) => handleChange(e)}
            >
              <option value="HIGH">High</option>
              <option value="NORMAL">Normal</option>
              <option value="LOW">Low</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="editIssue.percentDone">
            <Form.Label>
              <strong>%Done</strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Edit percent done"
              name="percentDone"
              value={editIssueData.percentDone}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="editIssue.assignedTo">
            <Form.Label>
              <strong>Assigned to</strong>
            </Form.Label>
            <Form.Control
              as="select"
              name="assignedToId"
              value={editIssueData.assignedToId}
              onChange={(e) => handleChange(e)}
            >
              <option value="Unassigned" disabled hidden>
                Unassigned
              </option>
              {assignedToId}
            </Form.Control>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="mr-2">
              Close
            </Button>
            <Button variant="primary" type="submit">
              Edit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditIssue;
