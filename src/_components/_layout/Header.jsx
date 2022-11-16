import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "_store/auth.slice";

import Logo from "_images/PatientAPP logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export { Header };

function Header() {
  const authUser = useSelector((x) => x.auth.user);
  const dispatch = useDispatch();
  const logout = async () => {
    dispatch(authActions.logout());
  };

  // check if authUser is empty
  if (!authUser) return null;

  return (
    <Navbar bg="white" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand>
          <img
            src={Logo}
            width="100%"
            height="30"
            alt="PatientAPP"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto mb-2 mb-lg-0">
            <LinkContainer to="/">
              <Nav.Link>
                <FontAwesomeIcon icon="home" /> Inicio
              </Nav.Link>
            </LinkContainer>
            {authUser.roles?.some((x) => x.name === "admin") && (
            <LinkContainer to="/users">
              <Nav.Link>
                <FontAwesomeIcon icon="users" /> Usuarios
              </Nav.Link>
            </LinkContainer>
            )}
            <LinkContainer to="/patients">
              <Nav.Link>
                <FontAwesomeIcon icon="user-injured" /> Pacientes
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/appointments">
              <Nav.Link>
                <FontAwesomeIcon icon="calendar-alt" /> Citas
              </Nav.Link>
            </LinkContainer>
            <NavDropdown
              title={authUser?.name}
              className="dropdown_button"
              id="basic-nav-dropdown"
            >
              <LinkContainer to="/profile">
                <NavDropdown.Item>Perfil</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>
                Cerrar sesión
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
