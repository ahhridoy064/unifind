import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./college.css";

const API_BASE_URL = "http://localhost:5000"; // Backend URL

const CollegeProfile = () => {
  const { id } = useParams(); // Get college ID from URL
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [review, setReview] = useState({ user: "", rating: 0, comment: "" });

  // Fetch college details from the backend
  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/colleges/${id}`);
        setCollege(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching college:", err);
        setError("Failed to load college details.");
        setLoading(false);
      }
    };
    fetchCollege();
  }, [id]);

  // Handle Review Submission
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/colleges/${id}/reviews`, review);
      setCollege(response.data); // Update with new review
      setReview({ user: "", rating: 0, comment: "" });
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  if (loading) return <p>Loading college details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="college-profile">
      <h2>{college.name}</h2>
      <img src={college.logo} alt={college.name} className="college-logo" />

      <p><b>Location:</b> {college.location}</p>
      <a href={college.googleMapLink} target="_blank" rel="noopener noreferrer">📍 View on Google Maps</a>

      <p><b>Contact:</b></p>
      <ul>
        <li>📞 Phone: {college.contact.phone}</li>
        <li>📧 Email: {college.contact.email}</li>
        <li>🌍 Website: <a href={college.contact.website} target="_blank" rel="noopener noreferrer">{college.contact.website}</a></li>
      </ul>

      <p><b>Programs Offered:</b> {college.programs.join(", ")}</p>
      <p><b>Admission Requirements:</b> {college.admissionRequirements}</p>

      <h3>Reviews & Ratings</h3>
      <ul>
        {college.reviews.length > 0 ? (
          college.reviews.map((r, index) => (
            <li key={index}><b>{r.user}</b> ({r.rating}/5): {r.comment}</li>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </ul>

      <h3>Add Your Review</h3>
      <form onSubmit={handleSubmitReview}>
        <input type="text" placeholder="Your Name" value={review.user} onChange={(e) => setReview({ ...review, user: e.target.value })} required />
        <input type="number" min="1" max="5" value={review.rating} onChange={(e) => setReview({ ...review, rating: parseInt(e.target.value) })} required />
        <textarea placeholder="Your Review" value={review.comment} onChange={(e) => setReview({ ...review, comment: e.target.value })} required></textarea>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default CollegeProfile;
