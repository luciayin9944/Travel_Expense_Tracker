// //TripList.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function TripList() {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        fetch("/trips", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((r) => {
            if (r.ok) {
                return r.json();
            } else {
                throw new Error("Unauthorized or failed to fetch");
            }
        }).then((data) => {
            console.log(data);
            setTrips(data.trips || []);
        }).catch((error) => {
            console.error("Error fetching trips:", error);
            setTrips([]);
        });
    }, []);

    return (
        <Wrapper>
            <Title>Trips</Title>
            {trips.length > 0 ? (
                <>
                    {trips.map((trip) => (
                        <TripCard key={trip.id}>
                            <Box>
                                <h2>{trip.destination}</h2>
                                <p>
                                    📅 Date: from {new Date(trip.start_date).toLocaleDateString()} to{" "}
                                    {new Date(trip.end_date).toLocaleDateString()}
                                    <br />
                                    💵 Budget: ${trip.budget}
                                </p>
                                <Button variant="outline" as={Link} to="/expenses">
                                    Expenses
                                </Button>
                            </Box>
                        </TripCard>
                    ))}

                    <Button as={Link} to="/newTrip">
                        Add a New Trip
                    </Button>
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
    );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 100px auto;
`;

const Title = styled.h1`
  color: #255b80;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 32px;
`;


const TripCard = styled.article`
  margin-bottom: 40px;
  padding: 16px;
  background-color: #f6f8fa;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export default TripList;



