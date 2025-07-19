import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles.jsx";

function NavBar({ user, setUser }) { 
  // props from App.jsx
  function handleLogoutClick() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <Wrapper>
      <Logo>
        <Link to="/">My App</Link>
      </Logo>
      <Nav>
        {user && (
          <Button>
            {user.username}
          </Button>
        )}
        <Button variant="outline" onClick={handleLogoutClick}>
          Logout
        </Button>
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const Logo = styled.h1`
  font-family: "Permanent Marker", cursive;
  font-size: 3rem;
  color: deeppink;
  margin: 0;
  line-height: 1;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  position: absolute;
  right: 8px;
`;

export default NavBar;