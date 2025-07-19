import { createContext} from "react";

export const UserContext = createContext();

function UserContextProvider({ children }) {
  let BACKEND_URL = "http://localhost:3000"
  let value = {BACKEND_URL};
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
