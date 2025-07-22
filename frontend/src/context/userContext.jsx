import { createContext, useState} from "react";

export const UserContext = createContext();

function UserContextProvider({ children }) {
    const [isOpen, setIsOpen] = useState(true);
  
  let BACKEND_URL = "http://localhost:3000"
  let value = {BACKEND_URL,isOpen, setIsOpen};
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
