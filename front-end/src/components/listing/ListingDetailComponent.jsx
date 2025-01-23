import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getListings, submitInquiry } from "../../services/ListingService";
import { checkLoginStatus } from "../../services/UserService";
import InquiryModal from "./InquiryModal"; 
import "./ListingDetailComponent.css";

const ListingDetailComponent = () => {
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userDetails, setUserDetails] = useState({ name: "", email: "" }); 
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await getListings(listingId); // Fetch listing details
        setListing(data); // Set listing data
      } catch (err) {
        setError("Failed to fetch listing details"); // Handle fetch error
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    const fetchUserDetails = async () => {
      try {
        const user = await checkLoginStatus(); // Check user login status
        const role = user?.authorities?.[0]?.authority; // Get user role
        setUserRole(role); // Set user role
        setUserDetails({
          name: "",
          email: user?.username || "", // Set user details
        });
      } catch (err) {
        console.error("Error fetching user details:", err); // Handle error
      }
    };

    fetchListing(); // Fetch listing details
    fetchUserDetails(); // Fetch user details
  }, [listingId]);

  const handleInquirySubmit = async (formData) => {
    try {
      const inquiryData = {
        ...formData,
        listingId: Number(listingId), // Add listingId to inquiry data
      };
      await submitInquiry(inquiryData); // Submit the inquiry
      alert("Inquiry submitted successfully!"); // Show success message
      setShowModal(false); // Close modal
    } catch (error) {
      console.error("Error submitting inquiry:", error); // Handle error
      alert("Failed to submit inquiry. Please try again."); // Show error message
    }
  };

  if (loading) return <p>Loading...</p>; // Show loading message
  if (error) return <p>{error}</p>; // Show error message

  return (
    <div className="listing-detail-container">
      {listing && (
        <div>
          <h2>{listing.title}</h2> {/* Display listing title */}
          <p>{listing.description}</p> {/* Display listing description */}
          <p><strong>Price:</strong> ${listing.price}</p> {/* Display listing price */}
          <p><strong>Address:</strong> {listing.address}</p> {/* Display listing address */}

          <button className="btn-back" onClick={() => navigate(-1)}>
            Back to Listings
          </button>
        </div>
      )}

      {userRole === "ROLE_STUDENT" && (
        <div className="inquiry-button-container">
          <button className="btn-inquiry w-100" onClick={() => setShowModal(true)}>
            Inquire About Listing
          </button>
        </div>
      )}

      <InquiryModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onSubmit={handleInquirySubmit}
        defaultValues={userDetails}
      />
    </div>
  );
};

export default ListingDetailComponent;
