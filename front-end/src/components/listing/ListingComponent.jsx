import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardComponent from "../card/CardComponent";
import { getListings } from "../../services/ListingService";
import "./ListingComponent.css";

const ListingsComponent = () => {
  console.log("Listing rendered");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings(); // Fetch listings data
        setListings(data); // Store listings in state
      } catch (err) {
        setError("Failed to fetch listings"); // Handle fetch error
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchListings(); // Call fetch function on component mount
  }, []);

  return (
    <Container className="listing-container" fluid>
      {loading && <p>Loading...</p>} {/* Show loading message */}
      {error && <p>{error}</p>} {/* Show error message */}
      <Row>
        {listings.map((listing) => (
          <Col key={listing.listingId} sm={12} md={6} lg={4}>
            <CardComponent
              title={listing.title}
              desc={listing.description}
              price={listing.price}
              address={listing.address}
              listingId={listing.listingId}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ListingsComponent;