import React, { Fragment, useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getExcerpt } from "../../utility/common";

const Issue = ({
  id,
  updatedAt,
  title,
  description,
  status,
  priority,
  assignedTo,
  project,
  removeIssue,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    try {
      setDeleting(true);
      await removeIssue(id);
      setShowModal(false);
    } catch (e) {
      const deleteError = e.message.replace("GraphQL error: ", "");
      setDeleteError(deleteError);
    } finally {
      setDeleting(false);
    }
  };

  const localeDate = new Date(updatedAt).toLocaleDateString();
  const excerpt = getExcerpt(description, 100);

  const handleClose = () => setShowModal(false);

  let bgStyle = {};
  bgStyle =
    status === "NEW"
      ? { backgroundColor: "rgba(0, 123, 255, .2)" }
      : status === "IN_PROGRESS"
      ? { backgroundColor: "rgba(40, 167, 69, .2)" }
      : status === "PENDING"
      ? { backgroundColor: "rgba(255, 193, 7, .2)" }
      : { backgroundColor: "rgba(220, 53, 69, .2)" };

  return (
    <Fragment>
      <div className="m-issue mb-3 px-3 py-2" style={bgStyle}>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-info">{localeDate}</small>
          <div className="l-tags">
            <Badge pill variant="info" className="mr-2 d-none d-md-inline">
              {!!assignedTo ? assignedTo.name : "Unassigned"}
            </Badge>
            <Badge pill variant="secondary" className="mr-2 d-none d-md-inline">
              {project.name}
            </Badge>
            <Badge
              className="mr-2"
              variant={
                status === "NEW"
                  ? "primary"
                  : status === "IN_PROGRESS"
                  ? "success"
                  : status === "PENDING"
                  ? "warning"
                  : "danger"
              }
            >
              {status}
            </Badge>
            <Badge
              variant={
                priority === "HIGH"
                  ? "danger"
                  : priority === "NORMAL"
                  ? "primary"
                  : "warning"
              }
            >
              {priority}
            </Badge>
          </div>
          <div className="l-delete">
            <span
              onClick={() => setShowModal(true)}
              className="text-danger"
              style={{ cursor: "pointer" }}
            >
              <FaTrash />
            </span>
          </div>
        </div>
        <div>
          <Link to={`/issues/${id}`}>{title}</Link>
        </div>
        <div className="d-md-none pr-3">{excerpt}</div>
        <div className="d-none d-md-block">{description}</div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete issue: {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!!deleteError && <Alert variant="danger">{deleteError}</Alert>}
          Are you sure to delete this issue?
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
    </Fragment>
  );
};

export default Issue;
