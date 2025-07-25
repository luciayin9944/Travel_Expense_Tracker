// //TripList.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import { useNavigate } from "react-router-dom";

function TripList() {
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();
    const queryParams = new URLSearchParams();
    const [filterYear, setFilterYear] = useState("");
    const [filterMonth, setFilterMonth] = useState("");

    useEffect(() => {
        fetch(`/trips?${queryParams.toString()}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((r) => {
                if (!r.ok) {
                    throw new Error("Failed to fetch trips");
                }
                return r.json();
            })
            .then((data) => {
                console.log(data);
                setTrips(data.trips || []);
            })
            .catch((error) => {
                console.error("Error fetching trips:", error);
                setTrips([]);
            });
    }, [filterYear, filterMonth]);


    function handleFilter() {
        const queryParams = new URLSearchParams();
        if (filterYear) queryParams.append("year", filterYear);
        if (filterMonth) queryParams.append("month", filterMonth);

        fetch(`/trips?${queryParams.toString()}`, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
          .then((r) => {
            if (!r.ok) throw new Error("Filter failed");
            return r.json();
            })
          .then((data) => {
            setTrips(data.trips || []);
            })
          .catch((err) => {
            console.error("Error filtering:", err);
            });
        }

    const handleViewExpenses = (tripId) => {
        navigate(`/trips/${tripId}/expenses`);
    };

    return (
        <div>

          <Wrapper>
            <Title>My Trips</Title>
            <div style={{ textAlign: "center" }}>
                <Button as={Link} to="/newTrip" >
                New Trip
                </Button>
            </div>
            
            <FilterWrapper>
                <label>
                    Year:
                    <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
                        <option value="">All</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        {/* {["2022", "2023", "2024", "2025"].map((year) => (
                        <option key={year} value={year}>{year}</option>
                        ))} */}
                    </select>
                </label>
                <label>
                    Month:
                    <select value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
                        <option value="">All</option>
                        {[...Array(12)].map((_, i) => {
                            const val = String(i + 1).padStart(2, "0");
                            return <option key={val} value={val}>{val}</option>;
                        })}
                    </select>
                </label>
                <Button variant="outline" onClick={() => handleFilter()}>Filter</Button>
            </FilterWrapper>

            {trips.length > 0 ? (
                <>
                    {trips.map((trip) => (
                        <TripCard key={trip.id}>
                            <Box>
                                <h2>{trip.destination}</h2>
                                <p>
                                    📅 {new Date(trip.start_date).toLocaleDateString()} ~ {new Date(trip.end_date).toLocaleDateString()}
                                    <br />
                                    💵 Budget: ${trip.budget}
                                </p>
                                <Button variant="outline" onClick={()=>handleViewExpenses(trip.id)}>
                                    View Expenses
                                </Button>
                                <Button variant="outline" as={Link} to={`/trips/${trip.id}/summary`}>
                                    View Summary
                                </Button>
                            </Box>
                        </TripCard>
                    ))}
                </>
            ) : (
                <>
                    <h2>No Trip Records Found</h2>
                    <Button as={Link} to="/newTrip">
                        Add a New Trip
                    </Button>
                </>
            )}
          </Wrapper>
        </div>
    );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 100px auto;
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
//   align-items: flex-end;
  gap: 16px;
  margin: 40px auto;
`;

const Title = styled.h1`
  color: #255b80;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 32px;
`;


const TripCard = styled.article`
  margin-top: 40px;
  margin-bottom: 40px;
  padding: 16px;
  background-color: #f6f8fa;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export default TripList;









// // //TripList.jsx

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import styled from "styled-components";
// import { Box, Button } from "../styles";
// import { useNavigate } from "react-router-dom";

// function TripList() {
//     const [trips, setTrips] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//     fetch("/trips", {
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//     })
//         .then((r) => {
//             if (!r.ok) {
//                 throw new Error("Failed to fetch trips");
//             }
//             return r.json();
//         })
//         .then((data) => {
//             console.log(data);
//             setTrips(data.trips || []);
//         })
//         .catch((error) => {
//             console.error("Error fetching trips:", error);
//             setTrips([]);
//         });
//     }, []);

//     const handleViewExpenses = (tripId) => {
//         navigate(`/trips/${tripId}/expenses`);
//     };

//     return (
//         <Wrapper>
//             <Title>My Trips</Title>
//             <div style={{ textAlign: "center" }}>
//                 <Button as={Link} to="/newTrip" >
//                 New Trip
//                 </Button>
//             </div>
//             {trips.length > 0 ? (
//                 <>
//                     {trips.map((trip) => (
//                         <TripCard key={trip.id}>
//                             <Box>
//                                 <h2>{trip.destination}</h2>
//                                 <p>
//                                     📅 {new Date(trip.start_date).toLocaleDateString()} ~ {new Date(trip.end_date).toLocaleDateString()}
//                                     <br />
//                                     💵 Budget: ${trip.budget}
//                                 </p>
//                                 <Button variant="outline" onClick={()=>handleViewExpenses(trip.id)}>
//                                     View Expenses
//                                 </Button>
//                                 <Button variant="outline" as={Link} to={`/trips/${trip.id}/summary`}>
//                                     View Summary
//                                 </Button>
//                             </Box>
//                         </TripCard>
//                     ))}
//                 </>
//             ) : (
//                 <>
//                     <h2>No Trip Records Found</h2>
//                     <Button as={Link} to="/newTrip">
//                         Add a New Trip
//                     </Button>
//                 </>
//             )}
//         </Wrapper>
//     );
// }

// const Wrapper = styled.section`
//   max-width: 800px;
//   margin: 100px auto;
// `;

// const Title = styled.h1`
//   color: #255b80;
//   text-align: center;
//   font-size: 2.5rem;
//   margin-bottom: 32px;
// `;


// const TripCard = styled.article`
//   margin-top: 40px;
//   margin-bottom: 40px;
//   padding: 16px;
//   background-color: #f6f8fa;
//   border-radius: 12px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
// `;

// export default TripList;



