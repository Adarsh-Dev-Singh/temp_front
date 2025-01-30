import React, { useState, useEffect } from "react";
import axios from "axios";

const SelfCheck = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  // Fetch categories on load
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/categories")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Fetch reviews for the selected category
  const fetchReviews = () => {
    axios
      .post("http://127.0.0.1:5000/reviews", { category: selectedCategory })
      .then((response) => {
        setReviews(response.data.reviews);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  };

  // Get prediction for the selected review
  const getPrediction = () => {
    if (!selectedReview) {
      alert("Please select a review.");
      return;
    }

    axios
      .post("http://127.0.0.1:5000/predict", {
        text: selectedReview.TEXT,
        true_label: selectedReview.LABEL, // Send true label for comparison
      })
      .then((response) => {
        setPrediction(response.data.prediction);
        setIsCorrect(response.data.is_correct);
      })
      .catch((error) => {
        console.error("Error fetching prediction:", error);
        setPrediction("Error occurred. Try again.");
      });
  };

  return (
    <div style={{ margin: "2em", fontFamily: "Arial" }}>
      <h1>Review Sentiment Classifier</h1>

      <div>
        <h2>Select a Product Category</h2>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">-- Select a Category --</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button onClick={fetchReviews} style={{ marginLeft: "1em" }}>
          Fetch Reviews
        </button>
      </div>

      {reviews.length > 0 && (
        <div style={{ marginTop: "2em" }}>
          <h2>Select a Review</h2>
          <select
            onChange={(e) =>
              setSelectedReview(reviews.find((r) => r.TEXT === e.target.value))
            }
          >
            <option value="">-- Select a Review --</option>
            {reviews.map((review, index) => (
              <option key={index} value={review.TEXT}>
                {review.TEXT.slice(0, 100)}... (True Label: {review.LABEL})
              </option>
            ))}
          </select>
          <button onClick={getPrediction} style={{ marginLeft: "1em" }}>
            Get Prediction
          </button>
        </div>
      )}

      {prediction && (
        <div style={{ marginTop: "2em" }}>
          <h3>Prediction:</h3>
          <p>
            Predicted: {prediction} | Actual:{" "}
            {selectedReview ? selectedReview.LABEL : "N/A"}
          </p>
          <p>
            {isCorrect !== null
              ? isCorrect
                ? "The prediction is correct."
                : "The prediction is incorrect."
              : ""}
          </p>
        </div>
      )}
    </div>
  );
};

export default SelfCheck;
