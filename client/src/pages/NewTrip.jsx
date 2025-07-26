//NewTrip.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, Error, FormField, Input, Label } from "../styles";


function NewTrip({ user }) {
    const [destination, setDestination] = useState("")
    const [budget, setBudget] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        fetch("/trips", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                destination,
                budget: parseFloat(budget),
                start_date: startDate,
                end_date: endDate
            }),
        }).then((r) => {
            setIsLoading(false);
            if(r.ok) {
                navigate("/");
            } else {
                r.json().then((err) => setErrors(err.errors || ["Submission failed."]));
            }
        });
    }

    return (
      <Wrapper>
        <WrapperChild>
            <h2>Add a Trip</h2>
            <form onSubmit={handleSubmit}>
              <FormField>
                <Label htmlFor="destination">Destination</Label>
                <Input
                    type="text"
                    id="destination"
                    placeholder="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    />
              </FormField>
              <FormField>
                <Label htmlFor="budget">Budget ($)</Label>
                <Input
                    type="number"
                    step="0.01"
                    id="budget"
                    placeholder="e.g. 9.99"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                />
              </FormField>
              <FormField>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
              </FormField>
              <FormField>
                <Label htmlFor="endtDate">End Date</Label>
                <Input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
              </FormField>
              <FormField>
                <Button color="primary" type="submit">
                {isLoading ? "Loading..." : "Submit"}
                </Button>
              </FormField>
              <FormField>
                {errors.map((err) => (
                <Error key={err}>{err}</Error>
                ))}
              </FormField>
            </form>
        </WrapperChild>

        <WrapperChild>
            <h1>{destination}</h1>
            <p>
                💵 Budget: ${budget}
                <br />
                📅 Start Date: {startDate || ""} 
                <br />
                📅 End Date: {endDate || ""}
            </p>
        </WrapperChild>
      </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 100px;
`;

const WrapperChild = styled.div`
  flex: 1;
  margin: 40px auto;
`;


export default NewTrip;