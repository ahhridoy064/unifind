import React, { useEffect, useState ,useContext } from "react";

import axios from "axios";
import { allpageProvider} from '../context/context.js'
// import "../pages/collegeProfile.css";
import "./collegeProfile.css";



const API_BASE_URL = "http://localhost:5000"; // Backend URL

const collegeProfile = () => {
  const { college }=useContext(allpageProvider)
  // const { id } = useParams(); // Get college ID from URL
  // const [college, setcollege] = useState(null);
 
  const [review, setReview] = useState({ user: "", rating: 0, comment: "" });

  useEffect(() => {

  }, []);

  const handleSubmitReview = async (e,id) => {
    e.preventDefault();

    console.log(id)
    console.log(review)
    try {
      const response = await axios.post(`${API_BASE_URL}/api/review/${id}/reviews`, review);
      // setcollege(response.data);
      setReview({ user: "", rating: 0, comment: "" });
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  // if (loading) return <p>Loading college details...</p>;
  // if (error) return <p>{error}</p>;

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
      <form onSubmit={(ee)=>handleSubmitReview(ee,college._id)}>
        <input type="text" placeholder="Your Name" value={review.user} onChange={(e) => setReview({ ...review, user: e.target.value })} required />
        <input type="number" min="1" max="5" value={review.rating} onChange={(e) => setReview({ ...review, rating: parseInt(e.target.value) })} required />
        <textarea placeholder="Your Review" value={review.comment} onChange={(e) => setReview({ ...review, comment: e.target.value })} required></textarea>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default collegeProfile;
