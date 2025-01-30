import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import TrendLineGraph from "./TrendLineGraph";

function Graph() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [chartData, setChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState({ fake: 0, genuine: 0 });

  // Fetch categories on component mount
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

  // Fetch reviews and predictions for the selected category
  const fetchReviews = (category) => {
    axios
      .post("http://127.0.0.1:5000/reviews", { category })
      .then((response) => {
        const reviews = response.data.reviews;

        // Fetch predictions for all reviews
        const predictionPromises = reviews.map((review) =>
          axios.post("http://127.0.0.1:5000/predict", { text: review.TEXT, true_label: review.LABEL })
        );

        Promise.all(predictionPromises)
          .then((predictions) => {
            const results = predictions.map((res) => res.data);

            // Calculate counts for the bar chart
            const actualFake = reviews.filter((review) => review.LABEL === "fake").length;
            const actualReal = reviews.filter((review) => review.LABEL === "real").length;
            const predictedFake = results.filter((result) => result.prediction === "fake").length;
            const predictedReal = results.filter((result) => result.prediction === "real").length;

            // Set bar chart data
            setChartData({
              labels: ["Actual Fake", "Actual Real", "Predicted Fake", "Predicted Real"],
              datasets: [
                {
                  label: "Count",
                  data: [actualFake, actualReal, predictedFake, predictedReal],
                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                },
              ],
            });

            // Set pie chart data
            let fakeCount = 0;
            let genuineCount = 0;
            results.forEach((result) => {
              if (result.prediction === "fake") {
                fakeCount++;
              } else if (result.prediction === "real") {
                genuineCount++;
              }
            });
            setPieChartData({ fake: fakeCount, genuine: genuineCount });
          })
          .catch((error) => {
            console.error("Error fetching predictions:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  };

  // Handle category selection
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    fetchReviews(category);
  };

  // Pie chart data
  const pieChart = {
    labels: ["Fake Reviews", "Genuine Reviews"],
    datasets: [
      {
        data: [pieChartData.fake, pieChartData.genuine],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF3B3B", "#2F7BC0"],
      },
    ],
  };

return (
  <div className="graph-container">
    <h1>Review Analysis</h1>
    <TrendLineGraph />

    {/* Dropdown for selecting categories */}
    <div className="category-selector">
      <label htmlFor="category">Select Category:</label>
      <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
        <option value="" disabled>
          Select a category
        </option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>

    {/* Display graphs side by side */}
    <div
      className="charts-container"
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        marginTop: "20px",
      }}
    >
      {/* Pie Chart */}
      {pieChartData.fake || pieChartData.genuine ? (
        <div className="chart" style={{ width: "300px", height: "300px" }}>
          <h3 style={{ textAlign: "center", fontSize: "1.2rem" }}>Fake vs. Genuine Reviews</h3>
          <Pie data={pieChart} />
        </div>
      ) : null}

      {/* Bar Chart */}
      {chartData ? (
        <div
          className="chart"
          style={{
            width: "300px",
            height: "300px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h3 style={{ fontSize: "1rem", marginBottom: "10px" }}>Review Prediction Comparison</h3>
          <div style={{ width: "100%", height: "100%" }}>
            <Bar
              data={chartData}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      ) : (
        <p>Select a category to view the review analysis.</p>
      )}
    </div>
  </div>
);
}
export default Graph;