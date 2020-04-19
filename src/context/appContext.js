import { createContext } from "react";

const appContext = createContext({
  user: null,
  posts: null
});

export { appContext as default };
