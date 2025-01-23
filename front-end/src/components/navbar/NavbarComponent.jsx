import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import NavbarModal from "./NavbarModal";
import CreateListingModal from "../listing/CreateListingModal";
import { checkLoginStatus, logoutUser } from "../../services/UserService";
import "./NavbarComponent.css";

const NavbarComponent = () => {
  const [showForm, setShowForm] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [formType, setFormType] = useState("login");

  const [showCreateModal, setShowCreateModal] = useState(false);

  const navigate = useNavigate();

  const handleCreateModalToggle = () => {
    setShowCreateModal(!showCreateModal); // Toggle create listing modal visibility
  };

  const handleMyListings = () => {
    if (!isLoggedIn || userRole !== "ROLE_LANDLORD") {
      alert("Only landlords can view their listings."); // Check role before accessing
      return;
    }
    navigate("/my-listings"); // Navigate to my listings page
  };

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const user = await checkLoginStatus(); // Check login status
        if (user) {
          setIsLoggedIn(true); // Set logged-in state
          setUserRole(user?.authorities?.[0]?.authority || null); // Set user role
        } else {
          setIsLoggedIn(false); 
          setUserRole(null); 
        }
      } catch (error) {
        setIsLoggedIn(false); 
        setUserRole(null); 
      }
    };

    checkStatus(); // Execute login status check
  }, []);

  const handleFormChange = (form) => {
    setFormType(form); // Set form type to login or register
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true); // Set login state after successful login
    setUserRole(user?.authorities?.[0]?.authority || null);
    setShowModal(false); 
    window.location.reload(); 
  };

  const handleLogout = async () => {
    try {
      await logoutUser(); 
      setIsLoggedIn(false);
      setUserRole(null); 
      alert("Logged out successfully!"); // Show logout success
    } catch (error) {
      alert("Logout failed!"); 
    }
  };

  return (
    <>
      <Navbar className="maroon-navbar" expand="sm" variant="dark" collapseOnSelect>
        <Container fluid>
          <Navbar.Brand href="/" className="text-truncate ms-3" style={{ maxWidth: '150px' }}>nextroom.ca</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {/* Show buttons only for landlords */}
              {isLoggedIn && userRole === "ROLE_LANDLORD" && (
                <>
                  <Button
                    variant="outline-primary"
                    className="w-sm-100 px-3 py-2"
                    onClick={handleCreateModalToggle}
                  >
                    Create Listing
                  </Button>
                  <Button variant="outline-primary" className="w-sm-100 px-3 py-2" onClick={handleMyListings}>
                    My Listings
                  </Button>
                </>
              )}

              <NavDropdown
                title={<><FaUser className="fs-5"/></>}
                id="navbar-dropdown"
                align="end"
              >
                {isLoggedIn ? (
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                ) : (
                  <>
                    <NavDropdown.Item onClick={() => handleFormChange("register")}>
                      Register
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleFormChange("login")}>
                      Login
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <CreateListingModal
        show={showCreateModal}
        handleClose={handleCreateModalToggle}
      />

      <NavbarModal
        showModal={showModal}
        formType={formType}
        onClose={handleCloseModal}
        setFormType={setFormType}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default NavbarComponent;
