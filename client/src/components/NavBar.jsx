// components/NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles.jsx";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <Wrapper>
      <Inner>
        <Logo>
          <Link to="/">Travel Spending</Link>
        </Logo>
        <Nav>
          {user && <Button>{user.username}</Button>}
          <Button variant="outline" onClick={handleLogoutClick}>
            Logout
          </Button>
        </Nav>
      </Inner>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: center; 
  align-items: center;
  z-index: 1000;
  padding: 0 20px;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1500px;        
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  font-family: "Permanent Marker", cursive;
  color: #255b80;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 10px;
`;

export default NavBar;






// //NavBar.jsx

// import React from "react";
// import { Link } from "react-router-dom";
// import styled from "styled-components";
// import { Button } from "../styles.jsx";

// function NavBar({ user, setUser }) { 
//   // props from App.jsx
//   function handleLogoutClick() {
//     localStorage.removeItem("token");
//     setUser(null);
//   }

//   return (
//     <Wrapper>
//       <Logo>
//         <Link to="/">Travel Spending</Link>
//       </Logo>
//       <Nav>
//         {user && (
//           <Button>
//             {user.username}
//           </Button>
//         )}
//         <Button variant="outline" onClick={handleLogoutClick}>
//           Logout
//         </Button>
//       </Nav>
//     </Wrapper>
//   );
// }

// const Wrapper = styled.header`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 8px;
// `;

// const Logo = styled.h1`
//   font-family: "Permanent Marker", cursive;
//   font-size: 2rem;
//   color: #255b80;
//   margin-right: auto;
//   left: 80px;
//   line-height: 1;

//   a {
//     color: inherit;
//     text-decoration: none;
//   }
// `;


// const Nav = styled.nav`
//   display: flex;
//   gap: 4px;
//   position: absolute;
//   right: 8px;
// `;

// export default NavBar;