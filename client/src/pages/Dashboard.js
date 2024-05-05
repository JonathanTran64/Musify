import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <h1>Dashboard</h1>
      {user && <h2>Hi {user.name}</h2>}
    </>
  );
};

export default Dashboard;
