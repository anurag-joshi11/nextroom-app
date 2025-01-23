import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getLandlordListings } from "../../services/ListingService";
import { checkLoginStatus } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import './ListingDetailComponent.css'

const MyListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const user = await checkLoginStatus();
        const email = user?.username;
        const data = await getLandlordListings(email);
        setListings(data);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError("Failed to load listings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container className="listing-container" style={{ marginTop: "100px" }}>
      <h2 className="text-center">My Listings</h2>
      <Row className="justify-content-center">
        {listings.map((listing) => (
          <Col key={listing.id} sm={12} md={8} lg={6} className="mb-4">
            <Card className="listing-card">
              <Card.Body>
                <Card.Title>{listing.title}</Card.Title>
                <Card.Text>
                  <strong>Price:</strong> ${listing.price}
                </Card.Text>
                <Card.Text>{listing.description}</Card.Text>
                <Card.Text>
                  <strong>Address:</strong> {listing.address}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        <button className="btn-back" onClick={() => navigate(-1)}>
          Back to Listings
        </button>
      </div>
    </Container>
  );
};

export default MyListingsPage;
