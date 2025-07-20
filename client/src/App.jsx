// App.jsx
import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar.jsx";
import SideBar from "./components/SideBar.jsx";
import Login from "./pages/Login.jsx";
import TripList from "./pages/TripList.jsx";
import NewTrip from "./pages/NewTrip.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/me", {
        headers: { Authorization: `Bearer ${token}` }
      }).then((r) => {
        if (r.ok) r.json().then((user) => setUser(user));
      });
    }
  }, []);

  const onLogin = (token, user) => {
    localStorage.setItem("token", token);
    setUser(user);
  };

  if (!user) return <Login onLogin={onLogin} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <SideBar />
      <div style={{ marginLeft: "200px", paddingTop: "60px", padding: "20px" }}>
        <Routes>
          <Route path="/newTrip" element={<NewTrip user={user} />} />
          <Route path="/trips" element={<TripList userId={user.id} />} />
          <Route path="/" element={<TripList userId={user.id} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;






// // App.jsx

// import React, { useEffect, useState } from "react";
// import NavBar from "./components/NavBar.jsx";
// import Login from "./pages/Login.jsx";
// import TripList from "./pages/TripList.jsx";     
// import NewTrip from "./pages/NewTrip.jsx";
// import { Routes, Route } from "react-router-dom";

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       fetch("/me", {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }).then((r) => {
//         if (r.ok) {
//           r.json().then((user) => setUser(user));
//         }
//       });
//     }
//   }, []);

//   const onLogin = (token, user) => {
//     localStorage.setItem("token", token);
//     setUser(user);
//   };

//   if (!user) return <Login onLogin={onLogin} />;

//   return (
//     <>
//       <NavBar setUser={setUser} user={user} />
//       <main>
//         <Routes>
//           <Route
//             path="/newTrip"
//             element={<NewTrip user={user} />}
//           />
//           <Route
//             path="/"
//             element={<TripList userId={user.id} />}
//           />
//         </Routes>
//       </main>
//     </>
//   );
// }

// export default App;