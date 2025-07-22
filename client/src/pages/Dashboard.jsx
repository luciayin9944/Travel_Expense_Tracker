import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { Box, Button } from "../styles";
import styled from "styled-components";


const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658",
  "#ff8042", "#8dd1e1", "#d0ed57", "#a4de6c"
];


function Dashboard() {
  const [trip, setTrip] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  // 获取最新 trip 信息
  useEffect(() => {
    fetch("/trips/latest", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch latest trip");
        return r.json();
      })
      .then((data) => {
        setTrip(data);

        // 接着获取这个 trip 的所有支出
        return fetch(`/expenses?trip_id=${data.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch expenses");
        return r.json();
      })
      .then((data) => {
        console.log("Fetched expenses:", data);
        // setExpenses(data);
        setExpenses(data.expenses)
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!trip) {
    return <p style={{ marginLeft: "40px" }}>You have no trips yet.</p>;
  }

  const { id, destination, start_date, end_date, budget } = trip;
  const totalSpent = expenses.reduce((sum, item) => sum + item.total, 0);
//   const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remainingBudget = budget - totalSpent;

  return (
    <div>
      <Wrapper>

        <h2>Welcome back!</h2>
        <h3>Here's your current trip summary:</h3>

        {/* <div style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
            maxWidth: "600px",
            marginTop: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}> */}
        <TripCard key={trip.id}>
            <Box>
                <h3>{destination}</h3>
                <p><strong>Dates:</strong> {start_date} - {end_date}</p>
                <p><strong>Budget:</strong> ${budget}</p>
                <p><strong>Total Spent:</strong> ${totalSpent}</p>
                <p><strong>Remaining Budget:</strong> ${remainingBudget}</p>
                <Button variant="outline" onClick={() => navigate(`/trips/${id}/expenses`)} style={{ marginTop: "10px" }}>
                    View Expense Detail
                </Button>
            </Box>
        </TripCard>
        {/* </div> */}

        <div style={{ marginTop: "40px", maxWidth: "600px" }}>
            <h4>Spending by Category</h4>
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={expenses} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#4287f5" />
            </BarChart>
            </ResponsiveContainer>
        </div>
      </Wrapper>
    </div>
  );
}

export default Dashboard;


const Wrapper = styled.section`
  max-width: 800px;
  margin: 100px auto;
`;


const TripCard = styled.article`
  margin-top: 40px;
  margin-bottom: 40px;
  padding: 16px;
  background-color: #f6f8fa;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;
