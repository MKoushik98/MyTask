import { useContext, useState } from "react";
import { AuthContext, AuthProvider } from "../src/components/context/AuthContext";
import Register from "./components/Register/Register";
import Login from "./components/login/Login";
import TaskManager from "./components/Taskmanager/TaskManager";

function MainApp() {
  const { user } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);

  if (user) {
    return <TaskManager />;
  }

  return (
    <div>
      {!showLogin ? (
        <Register switchToLogin={() => setShowLogin(true)} />
      ) : (
        <Login switchToRegister={() => setShowLogin(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <h1 style={{textAlign:'center',fontFamily:'cursive'}}>Task Manager</h1>
      <MainApp />
    </AuthProvider>
  );
}
