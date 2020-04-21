import React from "react";
import { Badge } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

const CurrentFilter = ({ filter, getFilter }) => {
  const resetFilterField = (field) => {
    console.log("reset filter", filter);
    if (field === "query") {
      getFilter({ ...filter, query: "" });
    }
    if (field === "assignedTo") {
      getFilter({ ...filter, assignedToId: "", assignedTo: "" });
    }
    if (field === "project") {
      getFilter({ ...filter, projectId: "", projectTo: "" });
    }
    if (field === "status") {
      getFilter({ ...filter, status: null });
    }
    if (field === "priority") {
      getFilter({ ...filter, priority: null });
    }
  };

  const isFilterApplied =
    !!filter.query ||
    !!filter.assignedToId ||
    !!filter.projectId ||
    !!filter.status ||
    !!filter.priority;

  const renderCurrentFilter = isFilterApplied ? (
    <div className="mb-3">
      <strong className="mr-3">Current filter:</strong>
      {!!filter.query && (
        <Badge
          pill
          onClick={() => resetFilterField("query")}
          className="mr-2"
          variant="secondary"
          style={{ cursor: "pointer" }}
        >
          Query: {filter.query} <FaTimes />
        </Badge>
      )}
      {!!filter.status && (
        <Badge
          pill
          onClick={() => resetFilterField("status")}
          className="mr-2"
          variant="secondary"
          style={{ cursor: "pointer" }}
        >
          Status: {filter.status} <FaTimes />
        </Badge>
      )}
      {!!filter.priority && (
        <Badge
          pill
          onClick={() => resetFilterField("priority")}
          className="mr-2"
          variant="secondary"
          style={{ cursor: "pointer" }}
        >
          Priority: {filter.priority} <FaTimes />
        </Badge>
      )}
      {!!filter.assignedToId && (
        <Badge
          pill
          onClick={() => resetFilterField("assignedTo")}
          className="mr-2"
          variant="secondary"
          style={{ cursor: "pointer" }}
        >
          Assigned to: {filter.assignedTo} <FaTimes />
        </Badge>
      )}
      {!!filter.projectId && (
        <Badge
          pill
          onClick={() => resetFilterField("project")}
          className="mr-2"
          variant="secondary"
        >
          Project: {filter.project} <FaTimes />
        </Badge>
      )}
    </div>
  ) : null;

  return <div>{renderCurrentFilter}</div>;
};

export default CurrentFilter;
