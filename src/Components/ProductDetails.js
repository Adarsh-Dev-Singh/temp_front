import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

function ProductDetails() {
  const { category } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .post("http://127.0.0.1:5000/reviews", { category })
      .then((response) => {
        setReviews(response.data.reviews);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews. Please try again later.");
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="product-details-container">
      <header className="product-header">
        <h1>Reviews for {category}</h1>
      </header>

      <section className="reviews-list">
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <div className="review-section">
              <p><strong>DOC_ID:</strong> {review.DOC_ID}</p>
              <p><strong>Label:</strong> {review.LABEL}</p>
              <p><strong>Rating:</strong> {review.RATING}</p>
              <p>
                <strong>Verified Purchase:</strong>{" "}
                {review.VERIFIED_PURCHASE ? "Yes" : "No"}
              </p>
              <p><strong>Product Category:</strong> {review.PRODUCT_CATEGORY}</p>
              <p><strong>Product ID:</strong> {review.PRODUCT_ID}</p>
              <p><strong>Product Title:</strong> {review.PRODUCT_TITLE}</p>
              <p><strong>Review Title:</strong> {review.REVIEW_TITLE}</p>
             {review.REVIEW_TEXT}
            </div>
            <div className="model-analysis">
              <strong>Model's Analysis:</strong> {review.MODEL_ANALYSIS}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default ProductDetails;
