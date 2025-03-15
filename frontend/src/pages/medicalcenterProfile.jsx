import React, { useEffect, useState ,useContext } from "react";

import axios from "axios";
import { allpageProvider} from '../context/context.js'
// import "../pages/schoolProfile.css";
import './medicalprofile.css'



const API_BASE_URL = "http://localhost:5000"; // Backend URL

const medicalProfile = () => {
  const { medical }=useContext(allpageProvider)
  // const { id } = useParams(); // Get medical ID from URL
  // const [medical, setmedical] = useState(null);
 
  const [review, setReview] = useState({ user: "", rating: 0, comment: "" });

  useEffect(() => {
    // const fetchmedical = async () => {
    //   try {
    //     const response = await axios.get(`${API_BASE_URL}/medicals/${id}`);
    //     setmedical(response.data);
    //     setLoading(false);
    //   } catch (err) {
    //     console.error("Error fetching medical:", err);
    //     setError("Failed to load medical details.");
    //     setLoading(false);
    //   }
    // };
    // fetchmedical();
  }, []);

  const handleSubmitReview = async (e,id) => {
    e.preventDefault();

    console.log(id)
    console.log(review)
    try {
      const response = await axios.post(`${API_BASE_URL}/api/review/${id}/reviews`, review);
      // setmedical(response.data);
      setReview({ user: "", rating: 0, comment: "" });
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  // if (loading) return <p>Loading medical details...</p>;
  // if (error) return <p>{error}</p>;

  return (
    <div className="medical-profile">
      <h2>{medical.name}</h2>
      <img src={medical.logo} alt={medical.name} className="medical-logo" />

      <p><b>Location:</b> {medical.location}</p>
      <a href={medical.googleMapLink} target="_blank" rel="noopener noreferrer">📍 View on Google Maps</a>

      <p><b>Contact:</b></p>
      <ul>
        <li>📞 Phone: {medical.contact.phone}</li>
        <li>📧 Email: {medical.contact.email}</li>
        <li>🌍 Website: <a href={medical.contact.website} target="_blank" rel="noopener noreferrer">{medical.contact.website}</a></li>
      </ul>
{/* 
      <p><b>Programs Offered:</b> {medical.programs.join(", ")}</p>
       <p><b>Admission Requirements:</b> {medical.admissionRequirements}</p>  */}

      <h3>Reviews & Ratings</h3>
      <ul>
        {medical.reviews.length > 0 ? (
          medical.reviews.map((r, index) => (
            <li key={index}><b>{r.user}</b> ({r.rating}/5): {r.comment}</li>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </ul>

      <h3>Add Your Review</h3>
      <form onSubmit={(ee)=>handleSubmitReview(ee,medical._id)}>
        <input type="text" placeholder="Your Name" value={review.user} onChange={(e) => setReview({ ...review, user: e.target.value })} required />
        <input type="number" min="1" max="5" value={review.rating} onChange={(e) => setReview({ ...review, rating: parseInt(e.target.value) })} required />
        <textarea placeholder="Your Review" value={review.comment} onChange={(e) => setReview({ ...review, comment: e.target.value })} required></textarea>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default medicalProfile;
