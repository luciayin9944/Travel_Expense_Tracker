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

    if (!tripInfo) {
        return <Title>Loading trip info...</Title>;
    }


    return (
        <>
            <Title>Expenses in {tripInfo.destination}</Title>
            <p style={{ textAlign: "center", marginBottom: "2rem" }}>
                📅 {new Date(tripInfo.start_date).toLocaleDateString()} - {new Date(tripInfo.end_date).toLocaleDateString()}
            </p>

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
                    <h1 style={{ textAlign: "left", fontWeight: "bold", marginTop: "100px" }}>
                        Spending Summary
                    </h1>

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
                            • {item.name}: ${item.total.toFixed(2)}
                        </li>
                        ))}
                    </ul>

                    <div style={{ textAlign: "left", fontWeight: "bold", marginTop: "12px" }}>
                        <h4>Total Budget: ${tripInfo.budget.toFixed(2)}</h4>
                        <h3>Total Spending: ${totalSpending.toFixed(2)}</h3>
                        <h4>Remaining: ${(tripInfo.budget - totalSpending).toFixed(2)}</h4>
                    </div>
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
  flex: 1.25;
  min-width: 400px;

  @media (max-width: 900px) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;



const SummaryBox = styled.div`
  flex: 0.6;
  min-width: 220px;
  margin-top: 48px;
  margin-right: 60px;
  padding: 60px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: transparent;

  .summary-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 16px;
    text-align: left;
  }

  .category-breakdown {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
  }

  .category-row {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
  }

  .category-name {
    font-weight: 500;
  }

  .category-amount {
    font-weight: 500;
  }

  .divider {
    border: none;
    border-top: 1px solid #ddd;
    margin: 16px 0;
  }

  .summary-totals {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
  }

  .summary-row.bold {
    font-weight: bold;
  }
`;



                //   <SummaryBox>
                //     <h2 className="summary-title">Spending Summary</h2>

                //     <div className="category-breakdown">
                //       {data.map((item, index) => (
                //         <div key={index} className="category-row">
                //             <span className="category-name" style={{ color: COLORS[index % COLORS.length] }}>
                //                 {item.name}
                //             </span>
                //             <span className="category-amount">${item.total.toFixed(2)}</span>
                //         </div>
                //       ))}
                //     </div>

                //     <hr className="divider" />

                //     <div className="summary-totals">
                //         <div className="summary-row">
                //             <span>Total Budget</span>
                //             <span>${tripInfo.budget.toFixed(2)}</span>
                //         </div>
                //         <div className="summary-row bold">
                //             <span>Total Spending</span>
                //             <span>${totalSpending.toFixed(2)}</span>
                //         </div>
                //         <div className="summary-row">
                //             <span>Remaining</span>
                //             <span>${(tripInfo.budget - totalSpending).toFixed(2)}</span>
                //         </div>
                //     </div>
                //   </SummaryBox>