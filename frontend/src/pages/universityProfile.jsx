import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./university.css";

const API_BASE_URL = "http://localhost:5000"; 

const UniversityProfile = () => {
  const { id } = useParams(); // Get university ID from URL
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [review, setReview] = useState({ user: "", rating: 0, comment: "" });

  // Fetch university details from the backend
  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/universities/${id}`);
        setUniversity(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching university:", err);
        setError("Failed to load university details.");
        setLoading(false);
      }
    };
    fetchUniversity();
  }, [id]);

  // Handle Review Submission
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/universities/${id}/reviews`, review);
      setUniversity(response.data); // Update with new review
      setReview({ user: "", rating: 0, comment: "" });
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  if (loading) return <p>Loading university details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="university-profile">
      <h2>{university.name}</h2>
      <img src={university.logo} alt={university.name} className="university-logo" />

      <p><b>Location:</b> {university.location}</p>
      <a href={university.googleMapLink} target="_blank" rel="noopener noreferrer">📍 View on Google Maps</a>

      <p><b>Contact:</b></p>
      <ul>
        <li>📞 Phone: {university.contact.phone}</li>
        <li>📧 Email: {university.contact.email}</li>
        <li>🌍 Website: <a href={university.contact.website} target="_blank" rel="noopener noreferrer">{university.contact.website}</a></li>
      </ul>

      <p><b>Programs Offered:</b> {university.programs.join(", ")}</p>
      <p><b>Admission Requirements:</b> {university.admissionRequirements}</p>

      <h3>Reviews & Ratings</h3>
      <ul>
        {university.reviews.length > 0 ? (
          university.reviews.map((r, index) => (
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

export default UniversityProfile;
