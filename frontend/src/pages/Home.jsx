import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [error, setError] = useState("");
=======
>>>>>>> friend/main

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      setCategories(response.data);
<<<<<<< HEAD
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories");
    } finally {
=======
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
>>>>>>> friend/main
      setLoading(false);
    }
  };

  const categoryIcons = {
    Mechanical: "⚙️",
    Electrical: "⚡",
    Business: "💼",
    "Non-fiction": "📖",
    Fiction: "📚",
    Science: "🔬",
    Technology: "💻",
  };

  if (loading) {
    return <div className="loading">Loading categories...</div>;
  }

<<<<<<< HEAD
  if (error) {
    return <div className="error">{error}</div>;
  }

=======
>>>>>>> friend/main
  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>Welcome to Library Portal</h1>
<<<<<<< HEAD
        <p>Browse our extensive collection of books across various categories</p>
=======
        <p>
          Browse our extensive collection of books across various categories
        </p>
>>>>>>> friend/main
      </section>

      <section className="categories-section">
        <h2>Explore by Category</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <Link
              to={`/books/${category}`}
              key={index}
              className="category-card"
            >
              <div className="category-icon">
                {categoryIcons[category] || "📕"}
              </div>
              <h3>{category}</h3>
              <p>Browse {category} books</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
