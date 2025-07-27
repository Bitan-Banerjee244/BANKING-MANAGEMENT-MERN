import { createContext, useState } from "react";

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCredited, setIsCredited] = useState(false);
  const [isDebited, setIsDebited] = useState(false);
  const [isLoanTaken, setIsLoanTaken] = useState(false);
  const [isTransferred, setIsTransferred] = useState(false);

  let BACKEND_URL = "http://localhost:3000";
  let value = {
    BACKEND_URL,
    isOpen,
    setIsOpen,
    isCredited,
    setIsCredited,
    isDebited,
    setIsDebited,
    isLoanTaken,
    setIsLoanTaken,
    isTransferred,
    setIsTransferred,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
