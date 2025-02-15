import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./medicalcenter.css";

const API_BASE_URL = "http://localhost:5000"; // Backend URL

const MedicalCenterProfile = () => {
  const { id } = useParams(); // Get medical center ID from URL
  const [medicalCenter, setMedicalCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [review, setReview] = useState({ user: "", rating: 0, comment: "" });

  // Fetch medical center details from the backend
  useEffect(() => {
    const fetchMedicalCenter = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/medicalcenters/${id}`);
        setMedicalCenter(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching medical center:", err);
        setError("Failed to load medical center details.");
        setLoading(false);
      }
    };
    fetchMedicalCenter();
  }, [id]);

  // Handle Review Submission
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/medicalcenters/${id}/reviews`, review);
      setMedicalCenter(response.data); // Update with new review
      setReview({ user: "", rating: 0, comment: "" });
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  if (loading) return <p>Loading medical center details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="medical-center-profile">
      <h2>{medicalCenter.name}</h2>
      <img src={medicalCenter.logo} alt={medicalCenter.name} className="medical-center-logo" />

      <p><b>Location:</b> {medicalCenter.location}</p>
      <a href={medicalCenter.googleMapLink} target="_blank" rel="noopener noreferrer">📍 View on Google Maps</a>

      <p><b>Contact:</b></p>
      <ul>
        <li>📞 Phone: {medicalCenter.contact.phone}</li>
        <li>📧 Email: {medicalCenter.contact.email}</li>
        <li>🌍 Website: <a href={medicalCenter.contact.website} target="_blank" rel="noopener noreferrer">{medicalCenter.contact.website}</a></li>
      </ul>

      <p><b>Services Offered:</b> {medicalCenter.services.join(", ")}</p>
      <p><b>Admission Requirements:</b> {medicalCenter.admissionRequirements}</p>

      <h3>Reviews & Ratings</h3>
      <ul>
        {medicalCenter.reviews.length > 0 ? (
          medicalCenter.reviews.map((r, index) => (
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

export default MedicalCenterProfile;
