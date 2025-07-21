// NewExpense.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, Error, FormField, Input, Label } from "../styles";
import { useParams } from "react-router-dom";

function NewExpense({ trip }) {
  const { trip_id } = useParams();
  const [purchaseItem, setPurchaseItem] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(""); 
  const [category, setCategory] = useState("")
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    fetch("/expenses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trip_id: parseInt(trip_id),
        expense_item: purchaseItem,
        category,
        amount: parseFloat(amount),
        date,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        navigate(`/trips/${trip_id}/expenses`);
      } else {
        r.json().then((err) => setErrors(err.errors || ["Submission failed."]));
      }
    });
  }

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Add an Expense</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="purchaseItem">Expense Item</Label>
            <Input
              type="text"
              id="purchaseItem"
              placeholder="Item Name"
              value={purchaseItem}
              onChange={(e) => setPurchaseItem(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="Category">Category</Label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">-- Select a Category --</option>
              <option value="Flight">Flight</option>
              <option value="Transportation">Transportation</option>
              <option value="Accommodation">Accommodation</option>
              <option value="Food">Food</option>
              <option value="Tickets">Tickets</option>
              <option value="Shopping">Shopping</option>
              <option value="Other">Other</option>
            </select>
          </FormField>
          <FormField>
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              type="number"
              step="0.01"
              id="amount"
              placeholder="e.g. 9.99"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="date">Date</Label>
            <Input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Submit Expense"}
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
        <h1>{purchaseItem}</h1>
        <p>
          📂 {category || "No category"}
          <br />
          💵 ${amount}
          <br />
          📅 {date || "No date"}
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
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default NewExpense;




