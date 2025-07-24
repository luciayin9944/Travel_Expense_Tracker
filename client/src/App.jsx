// App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import SideBar from "./components/SideBar.jsx";
import Login from "./pages/Login/Login.jsx";
import TripList from "./pages/TripList/TripList";
import NewTrip from "./pages/NewTrip/NewTrip.jsx";
import ExpenseList from "./pages/ExpenseList/ExpenseList.jsx";
import NewExpense from "./pages/NewExpense";
import ExpenseSummary from "./pages/ExpenseSummary";
import Dashboard from "./pages/Dashbaord/Dashboard.jsx";


function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/", {
        headers: { Authorization: `Bearer ${token}` }
      }).then((r) => {
        if (r.ok) r.json().then((user) => setUser(user));
      });
    }
  }, []);

  const onLogin = (token, user) => {
    localStorage.setItem("token", token);
    setUser(user);
    navigate("/dashboard");
  };

  if (!user) return <Login onLogin={onLogin} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <SideBar />
      <div style={{ marginLeft: "200px", paddingTop: "60px", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<TripList userId={user.id} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trips" element={<TripList userId={user.id} />} />
          <Route path="/newTrip" element={<NewTrip user={user} />} />
          <Route path="/trips/:trip_id/expenses" element={<ExpenseList />} />
          <Route path="/trips/:trip_id/new_expense" element={<NewExpense />} />
          <Route path="/trips/:trip_id/summary" element={<ExpenseSummary />} />
        </Routes>
      </div>
    </>
  );
}

export default App;


