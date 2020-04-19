import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useUsers } from "../../hooks/useUsers";
import { useForm } from "../../hooks/useForm";
import { useProjectDetails } from "../../hooks/useProjectDetails";
import { useUpdateProject } from "../../hooks/useUpdateProject";

const AddTeamMemberForm = ({ projectId, submitForm, closeForm }) => {
  const { data } = useUsers();
  const { data: projectData } = useProjectDetails(projectId, "updatedAt_DESC");
  const [teamData, , handleChange] = useForm({ ids: [] });
  const { updateProject } = useUpdateProject();
  const [adding, setAdding] = useState(false);
  const [errors, setErrors] = useState({});

  const teamIds =
    !!projectData && projectData.project.team.map((member) => member.id);

  const team =
    data &&
    data.users
      .filter((user) => !teamIds.includes(user.id))
      .map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrors({});
      setAdding(true);
      await updateProject({
        variables: {
          id: projectId,
          teamIds: teamData.ids,
        },
      });

      submitForm();
    } catch (e) {
      console.log("err", e);
      setAdding(false);
      const graphqlError = e.message.replace("GraphQL error: ", "");
      setErrors({ graphqlError });
    } finally {
      setAdding(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {!!errors.graphqlError && (
        <Alert variant="danger">{errors.graphqlError}</Alert>
      )}
      <Form.Group controlId="team.members">
        <Form.Label>Select team members</Form.Label>
        <Form.Control
          as="select"
          multiple
          name="ids"
          value={teamData.ids}
          onChange={(e) => handleChange(e)}
        >
          {team}
        </Form.Control>
      </Form.Group>
      <div className="d-flex justify-content-end">
        <Button
          variant="secondary"
          onClick={() => closeForm()}
          className="mr-2"
        >
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={adding}>
          {adding ? "Adding..." : "Add"}
        </Button>
      </div>
    </Form>
  );
};

export default AddTeamMemberForm;
