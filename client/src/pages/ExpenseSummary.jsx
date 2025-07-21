 // ExpenseSummary.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Box, Button } from "../styles";


const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658",
  "#ff8042", "#8dd1e1", "#d0ed57", "#a4de6c"
];


function ExpenseSummary() {

    const { trip_id } = useParams();
    const [tripInfo, setTripInfo] = useState(null);
    const [data, setData] = useState([]);
    const totalSpending = data.reduce((sum, item) => sum + item.total, 0);
    
        useEffect(() => {
            // fetch(`/trips/${trip_id}`, {
            fetch(`/trips/${trip_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then((r) => r.ok ? r.json() : Promise.reject("Failed to fetch trip info"))
                .then((data) => {
                setTripInfo(data);
                })
                .catch((err) => {
                console.error("Trip info fetch error:", err);
                });
        }, [trip_id]);


        useEffect(()=>{
            fetch(`/trips/${trip_id}/summary`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((r) => r.json())
            .then((data) => {
                const processed = data.map((item)=> ({
                    ...item,
                    name: item.category
                }));
                setData(processed)
            });
        }, [trip_id])



    return (
        <>
            {tripInfo ? (
                <>
                    <Title>Expenses in {tripInfo.destination}</Title>
                    <p style={{ textAlign: "center", marginBottom: "2rem" }}>
                        📅 {new Date(tripInfo.start_date).toLocaleDateString()} - {new Date(tripInfo.end_date).toLocaleDateString()}
                    </p>
                </>
                ) : (
                <Title>Loading trip info...</Title>
            )}

            {data.length === 0 ? (
                <p style={{ textAlign: "center" }}>No data available</p>
            ) : (
                <FlexWrapper>
                  <ChartBox>
                    <PieChart width={800} height={400}>
                        <Pie
                            dataKey="total"
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            fill="#8884d8"
                            label={({ name, percent }) =>
                                `${name}: ${(percent * 100).toFixed(1)}%`
                            }
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                  </ChartBox>

                {/* summary */}
                  <SummaryBox>
                    <p style={{ textAlign: "left", fontWeight: "bold", marginTop: "100px" }}> 
                        Spending Summary
                    </p>

                    <ul style={{ textAlign: "left", listStyleType: "none", padding: 0 }}>
                      {data.map((item, index) => (
                        <li
                            key={index}
                            style={{
                                color: COLORS[index % COLORS.length],
                                margin: "4px 0",
                                fontSize: "16px",
                            }}
                        >
                            {item.name}: ${item.total.toFixed(2)}
                        </li>
                    ))}
                    </ul>

                    <p style={{ textAlign: "left", fontWeight: "bold", marginTop: "12px" }}>
                        Total Spending: ${totalSpending.toFixed(2)}
                    </p>
                  </SummaryBox>
                </FlexWrapper>
            )}
        </>
    )
}



export default ExpenseSummary;


// styled-component
const Title = styled.h1`
  color: #255b80;
  text-align: center;
  font-size: 2.5rem;
  margin-top: 60px;
  margin-bottom: 32px;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  flex-wrap: wrap;
  margin-top: 20px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ChartBox = styled.div`
  flex: 1;
  min-width: 400px;

  @media (max-width: 900px) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const SummaryBox = styled.div`
  flex: 1;
  min-width: 220px;

  @media (max-width: 900px) {
    width: 100%;
    padding: 0 16px;
    text-align: center;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin: 4px 0;
    font-size: 16px;
  }

  p {
    font-weight: bold;
  }
`;



