import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Alert } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

const Project = ({ id, name, description, excerpt, deleteProject }) => {
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClose = () => setShowDeleteConfirmDialog(false);
  const handleDelete = async () => {
    try {
      setErrors({});
      setDeleting(true);
      await deleteProject(id);
      setShowDeleteConfirmDialog(false);
    } catch (e) {
      const graphqlError = e.message.replace("GraphQL error: ", "");
      setErrors({ graphqlError });
    } finally {
      setDeleting(false);
    }
  };
  return (
    <>
      <div className="m-project py-2 px-3 mb-3">
        <div className="mb-2">
          <Link to={`/projects/${id}`}>{name}</Link>
        </div>
        <div className="d-md-none">{excerpt}</div>
        <div className="d-none d-md-block">{description}</div>
        <div className="l-delete">
          <span
            onClick={() => setShowDeleteConfirmDialog(true)}
            className="text-danger"
            style={{ cursor: "pointer" }}
          >
            <FaTrash />
          </span>
        </div>
      </div>
      <Modal show={showDeleteConfirmDialog} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete project: {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!!errors.graphqlError && (
            <Alert variant="danger">{errors.graphqlError}</Alert>
          )}
          Deleting project will also delete all issues attached to it.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Project;
