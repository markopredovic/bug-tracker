import React, { Fragment, useContext } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import AppContext from "../context/appContext";
import { FaUser, FaSignOutAlt, FaFileAlt, FaPlusSquare } from "react-icons/fa";

const Header = () => {
  const context = useContext(AppContext);

  const renderTooltip = (props) => {
    return (
      <Tooltip id="button-tooltip" {...props}>
        Add new Issue
      </Tooltip>
    );
  };

  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <div className="container">
          <Navbar.Brand as={Link} to="/">
            Issues tracker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to="/" exact>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/projects" exact>
                Projects
              </Nav.Link>
              <Nav.Link as={NavLink} to="/issues" exact>
                Issues
              </Nav.Link>
            </Nav>
            <Nav>
              {!!context.token ? (
                <Fragment>
                  <Nav.Link
                    as={NavLink}
                    to="/issues/new"
                    className="d-lg-none"
                    exact
                  >
                    Add Issue
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/issues/new"
                    className="d-none d-lg-block mr-2"
                    exact
                  >
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 100, hide: 250 }}
                      overlay={renderTooltip}
                    >
                      <FaPlusSquare style={{ fontSize: "24px" }} />
                    </OverlayTrigger>
                  </Nav.Link>
                  <NavDropdown
                    alignRight={true}
                    title={context.user ? context.user.name : "not looged in"}
                    id="dashboard"
                  >
                    <NavDropdown.Item as={NavLink} to="/profile">
                      <FaUser /> Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={NavLink} to="/logout">
                      <FaSignOutAlt /> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Fragment>
              ) : (
                <Fragment>
                  <Nav.Link as={NavLink} to="/signup">
                    Sign up
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/login">
                    Login
                  </Nav.Link>
                </Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </header>
  );
};

export default Header;
