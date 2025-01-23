import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import './CardComponent.css';  // Optional: CSS for the card styling

const CardComponent = ({ title, price, listingId }) => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleViewDetails = () => {
    console.log("Navigating to /listing with ID:", listingId); // Debug log
    navigate(`/listing/${listingId}`); // Navigate to the details page
  };

  return (
    <Card className="listing-card">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text><strong>Price:</strong> ${price}</Card.Text>
        <Button variant="primary" size="sm" onClick={handleViewDetails}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;