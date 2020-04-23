import React, { Fragment, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useUserProfile } from "../hooks/useUserProfile";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useDeleteUser } from "../hooks/useDeleteUser";
import {
  FaUser,
  FaEnvelope,
  FaBriefcase,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { Button, Modal, Form } from "react-bootstrap";
import AppContext from "../context/appContext";
import UserIssuesChart from "./UserIssuesChart";

const UserProfile = () => {
  const context = useContext(AppContext);
  const history = useHistory();
  const [showEdit, setShowEdit] = useState(false);
  const [userEdited, setUserEdited] = useState(false);
  const [deletingUser, setDeletingUser] = useState(false);
  const { loading, error, data, refetch } = useUserProfile();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    position: "",
  });
  const { updateUser } = useUpdateUser();
  const { deleteUser } = useDeleteUser();

  useEffect(() => {
    if (data) {
      refetch();
      setUserData(data.me);
    }
  }, [data]);

  useEffect(() => {
    if (userEdited) {
      refetch();
    }
  }, [userEdited]);

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error.message}`;

  const handleEdit = () => {
    setUserEdited(false);
    setShowEdit(true);
  };

  const handleClose = () => {
    setShowEdit(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateUser({
      variables: {
        ...userData,
      },
    });

    context.updateUser(userData);

    setUserEdited(true);
    setShowEdit(false);
  };

  const handleDelete = async () => {
    try {
      setDeletingUser(true);
      await deleteUser();
      context.userLoggedOut();
      setDeletingUser(false);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Fragment>
      <div className="pt-2">
        <p>
          <span className="mr-2">
            <FaUser />
          </span>
          {data.me.name}
        </p>
        <p>
          <span className="mr-2">
            <FaBriefcase />
          </span>
          {data.me.position}
        </p>
        <p>
          <span className="mr-2">
            <FaEnvelope />
          </span>
          {data.me.email}
        </p>
      </div>
      <div className="mb-5">
        <Button variant="warning" className="mr-3" onClick={handleEdit}>
          <FaEdit /> Edit
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          <FaTrash /> {deletingUser ? "Deleting..." : "Delete"}
        </Button>
      </div>
      <UserIssuesChart />
      <Modal show={showEdit} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="user.name">
              <Form.Label>User name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="user.email">
              <Form.Label>User email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="user.position">
              <Form.Label>User position</Form.Label>
              <Form.Control
                type="text"
                name="position"
                placeholder="Enter position"
                value={userData.position}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="mr-3"
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default UserProfile;
