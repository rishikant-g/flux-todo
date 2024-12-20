import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import { URLS } from "../common/constants/urls";
import { useLogout } from "../common/services/useAuth";
import { useEffect } from "react";
import { useAuth } from "../provider/authProvider";
import { Button, Container, Navbar } from "react-bootstrap";

function Header() {
  const authCtx = useAuth();

  const { mutate, isSuccess } = useLogout(URLS.LOGOUT);

  const handleLogout = () => {
    mutate(authCtx.token);
  };

  useEffect(() => {
    if (isSuccess) {
      authCtx.logout();
    }
  }, [isSuccess]);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="navbar-brand">Flux Todo</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!authCtx.isLoggedIn && (
                <>
                  <NavLink to="/" className={(isActive) => isActive ? 'nav-link active' : 'nav-link'}>
                    Login
                  </NavLink>
                  <NavLink to="/register" className={(isActive) => isActive ? 'nav-link active' : 'nav-link'}>
                    Register
                  </NavLink>
                </>
              )}
              {authCtx.isLoggedIn && (
                <Nav.Link className="mx-5">
                  <Button variant="danger" onClick={handleLogout}>
                    Logout
                  </Button>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
