import React, { useEffect, useState ,useContext } from "react";

import axios from "axios";
import { allpageProvider} from '../context/context.js'
import "../pages/schoolProfile.css";



const API_BASE_URL = "http://localhost:5000"; // Backend URL

const SchoolProfile = () => {
  const { school }=useContext(allpageProvider)
  // const { id } = useParams(); // Get school ID from URL
  // const [school, setSchool] = useState(null);
 
  const [review, setReview] = useState({ user: "", rating: 0, comment: "" });

  useEffect(() => {

  }, []);

  const handleSubmitReview = async (e,id) => {
    e.preventDefault();

    console.log(id)
    console.log(review)
    try {
      const response = await axios.post(`${API_BASE_URL}/api/review/${id}/reviews`, review);
      // setSchool(response.data);
      setReview({ user: "", rating: 0, comment: "" });
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  

  return (
    <div className="school-profile">
      <h2>{school.name}</h2>
      <img src={school.logo} alt={school.name} className="school-logo" />

      <p><b>Location:</b> {school.location}</p>
      <a href={school.googleMapLink} target="_blank" rel="noopener noreferrer">📍 View on Google Maps</a>

      <p><b>Contact:</b></p>
      <ul>
        <li>📞 Phone: {school.contact.phone}</li>
        <li>📧 Email: {school.contact.email}</li>
        <li>🌍 Website: <a href={school.contact.website} target="_blank" rel="noopener noreferrer">{school.contact.website}</a></li>
      </ul>

      <p><b>Programs Offered:</b> {school.programs.join(", ")}</p>
       {/* <p><b>Admission Requirements:</b> {school.admissionRequirements}</p>  */}

      <h3>Reviews & Ratings</h3>
      <ul>
        {school.reviews.length > 0 ? (
          school.reviews.map((r, index) => (
            <li key={index}><b>{r.user}</b> ({r.rating}/5): {r.comment}</li>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </ul>

      <h3>Add Your Review</h3>
      <form onSubmit={(ee)=>handleSubmitReview(ee,school._id)}>
        <input type="text" placeholder="Your Name" value={review.user} onChange={(e) => setReview({ ...review, user: e.target.value })} required />
        <input type="number" min="1" max="5" value={review.rating} onChange={(e) => setReview({ ...review, rating: parseInt(e.target.value) })} required />
        <textarea placeholder="Your Review" value={review.comment} onChange={(e) => setReview({ ...review, comment: e.target.value })} required></textarea>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default SchoolProfile;
