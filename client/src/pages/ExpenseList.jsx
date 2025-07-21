// ExpenseList.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import Pagination from "../components/Pagination";
import { useParams } from "react-router-dom";

function ExpenseList() {
  const { trip_id } = useParams();
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    purchase_item: "",
    category: "",
    amount: "",
    date: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // const totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  useEffect(() => {
    // ?key=value&key2=value2  /trips?trip_id=3&page=2&per_page=5
    const queryParams = new URLSearchParams();
    queryParams.set("trip_id", trip_id);
    queryParams.set("page", currentPage);
    queryParams.set("per_page", 5);

    fetch(`/expenses?${queryParams.toString()}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
        .then((r) => r.ok ? r.json() : Promise.reject("Failed to fetch"))
        .then((data) => {
            setExpenses(data.expenses || []);
            setTotalPages(data.total_pages || 1);
        })
        .catch((err) => {
            console.error("Fetch error:", err);
            setExpenses([]);
        });
    }, [trip_id, currentPage]);



  function handleEdit(expense) {
    setEditingId(expense.id);
    setEditFormData({
      purchase_item: expense.purchase_item,
      category: expense.category,
      amount: expense.amount,
      date: expense.date.slice(0, 10),
    });
  }

  function handleEditFormChange(e) {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  }

  function handleEditSubmit(id) {
    fetch(`/expenses/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(editFormData),
    })
      .then((r) => r.ok ? r.json() : Promise.reject("Update failed"))
      .then((updated) => {
        setExpenses((prev) => prev.map((e) => (e.id === id ? updated : e)));
        setEditingId(null);
      })
      .catch((err) => alert(err));
  }

  function handleDelete(id) {
    fetch(`/expenses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((r) => {
      if (r.ok) setExpenses((prev) => prev.filter((e) => e.id !== id));
    });
  }

  return (
    <div>
      <Title>My Expenses</Title>

      <div style={{ textAlign: "center" }}>
        {/* <p style={{ fontWeight: "bold" }}>Total: ${totalExpense.toFixed(2)}</p> */}
        <Button as={Link} to={`/trips/${trip_id}/new_expense`} variant="outline">
          New Expense
        </Button>
      </div>

      <Wrapper>
        {expenses.length > 0 ? ( 
          expenses.map((expense) => (
            <ExpenseCard key={expense.id}>
              <Box>
                {editingId === expense.id ? (
                  <EditForm>
                    <input
                      name="purchase_item"
                      value={editFormData.purchase_item}
                      onChange={handleEditFormChange}
                    />
                    <select
                      name="category"
                      value={editFormData.category}
                      onChange={handleEditFormChange}
                    >
                      {['Flight', 'Transportation', 'Accommodation', 'Food', 'Tickets', 'Shopping', 'Other'].map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <input
                      name="amount"
                      type="number"
                      value={editFormData.amount}
                      onChange={handleEditFormChange}
                    />
                    <input
                      name="date"
                      type="date"
                      value={editFormData.date}
                      onChange={handleEditFormChange}
                    />
                    <Button onClick={() => handleEditSubmit(expense.id)}>Save</Button>
                    <Button onClick={() => setEditingId(null)}>Cancel</Button>
                  </EditForm>
                ) : (
                  <>
                    <h2>{expense.purchase_item}</h2>
                    <p>
                      📂 {expense.category} <br />
                      💵 ${expense.amount} <br />
                      📅 {new Date(expense.date).toLocaleDateString()} <br />
                    </p>
                    <Button onClick={() => handleEdit(expense)}>Edit</Button>
                    <Button onClick={() => handleDelete(expense.id)}>Delete</Button>
                  </>
                )}
              </Box>
            </ExpenseCard>
          ))
        ) : (
          <>
            <h3>No Expense Records Found</h3>
            <Button as={Link} to="/new">Add a New Expense</Button>
          </>
        )}
      </Wrapper>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(pageNum) => setCurrentPage(pageNum)}
      />
    </div>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Title = styled.h1`
  color: #255b80;
  text-align: center;
  font-size: 2.5rem;
  margin-top: 60px;
  margin-bottom: 32px;
`;

const ExpenseCard = styled.article`
  margin-bottom: 24px;
  padding: 16px;
  background-color: #f6f8fa;
  border-radius: 12px;
`;

const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  input, select {
    padding: 8px;
    font-size: 16px;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 40px auto;
`;

export default ExpenseList;




