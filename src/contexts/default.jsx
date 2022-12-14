import { createContext, useContext, useState } from "react";

// Create context
export const DefaultContext = createContext();

// Export provider
export function DefaultProvider({ children }) {
  const [darkmode, setDarkmode] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [sideBar, setSideBar] = useState(false)
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("")


  return (
    <DefaultContext.Provider
      value={{ darkmode, setDarkmode, isMobile, setIsMobile, username, setUsername, sideBar, setSideBar, roomName, setRoomName}}
    >
      {children}
    </DefaultContext.Provider>
  );
}

// useContext-hook
export function useDefaultProvider() {
  const context = useContext(DefaultContext);

  if (!context) {
    throw new Error("useDefaultProvider is outside of defaultProvider");
  }

  return context;
}
