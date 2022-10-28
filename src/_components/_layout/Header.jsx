import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "_store/auth.slice";

export { Header };

function Header() {
  const authUser = useSelector((x) => x.auth.user);
  const dispatch = useDispatch();
  const logout = async () => {
    dispatch(authActions.logout());
  };

  // only show nav when logged in
  if (!authUser) return null;

  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand>
        <img
              src="https://holasoft.es/wp-content/uploads/2017/08/logo-horizontal-700.png"
              width="100"
              alt="React Bootstrap logo"
            />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto mb-2 mb-lg-0">
            <NavDropdown title={authUser?.email} className="dropdown_button" id="basic-nav-dropdown">
            <LinkContainer to="/home">
                <NavDropdown.Item>Inicio</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/patients">
                <NavDropdown.Item>Pacientes</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/appointments">
                <NavDropdown.Item>Citas</NavDropdown.Item>
            </LinkContainer>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Cerrar sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
