import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AllProducts.css"; // Import the updated CSS

function AllProducts() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch categories from the API
    axios
      .get("http://127.0.0.1:5000/categories")
      .then((response) => {
        setCategories(response.data.categories);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="all-products-container">

      <section className="products-list">
        {categories.map((category, index) => (
          <div className="product-card" key={index}>
            <div className="img-cover">
              <img
                src={`./${category}.jpg`} // Placeholder image
                alt={category}
              />
            
            </div>

            <div className="desc">
              <h2>{category}</h2>
              <p>Explore reviews and details for this category</p>
              <Link to={`/category/${category}`} className="bg-zinc-900">
                <button className="text-white font-bold rounded">
                  View Reviews
                  <svg
                    width="19"
                    height="14"
                    viewBox="0 0 23 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  ></svg>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default AllProducts;
