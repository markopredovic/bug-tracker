import { GraphQLEnumType } from "graphql";

const ISSUE_STATUS = new GraphQLEnumType({
  name: "ISSUE_STATUS",
  values: {
    // The values are going to be used in the actual redis key itself
    // i.e. analytics => recent:analytics:username
    NEW: { value: "NEW" },
    IN_PROGRESS: { value: "IN_PROGRESS" },
    PENDING: { value: "PENDING" },
    CLOSED: { value: "CLOSED" },
  },
});

const ISSUE_PRIORITY = new GraphQLEnumType({
  name: "ISSUE_PRIORITY",
  values: {
    // The values are going to be used in the actual redis key itself
    // i.e. analytics => recent:analytics:username
    HIGH: { value: "HIGH" },
    NORMAL: { value: "NORMAL" },
    LOW: { value: "LOW" },
  },
});

export { ISSUE_STATUS, ISSUE_PRIORITY };
