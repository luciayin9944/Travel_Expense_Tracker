//TripList.jsx

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
            if(r.ok) {
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
        {trips.length > 0 ? (
            trips.map((trip) => (
            <TripCard key={trip.id}>
                <Box>
                <h2>{trip.destination}</h2>
                <p>
                    💵 Budget: ${trip.budget}
                    <br />
                    📅 Date: from {new Date(trip.start_date).toLocaleDateString()} to {new Date(trip.end_date).toLocaleDateString()}
                    <br />
                </p>

                </Box>
            </TripCard>
            ))
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
  margin: 40px auto;
`;

const TripCard = styled.article`
  margin-bottom: 24px;
  padding: 16px;
  background-color: #f6f8fa;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export default TripList;

