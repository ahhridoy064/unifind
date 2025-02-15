import React, { useEffect, useState } from "react";
import axios from "axios";
import "./college.css";

const API_BASE_URL = "http://localhost:5003"; // Change if backend runs on another port

const Colleges = () => {
  const [colleges, setColleges] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [filterDivision, setFilterDivision] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch colleges from backend
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/colleges`);
        setColleges(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching colleges:", err);
        setError("Failed to load colleges.");
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  // Extract divisions dynamically from the fetched colleges
  const divisions = [...new Set(colleges.map(college => college.division))];

  return (
    <section id="colleges" className="colleges">
      <div className="container">
        <h2>Colleges in Bangladesh</h2>

        <div className="filter-section">
          <button onClick={() => setFilterType("all")} className={filterType === "all" ? "active" : ""}>All</button>
          <button onClick={() => setFilterType("government")} className={filterType === "government" ? "active" : ""}>Government</button>
          <button onClick={() => setFilterType("non-government")} className={filterType === "non-government" ? "active" : ""}>Non-Government</button>

          <select onChange={(e) => setFilterDivision(e.target.value)} value={filterDivision}>
            <option value="all">All Divisions</option>
            {divisions.map((division) => (
              <option key={division} value={division}>{division.charAt(0).toUpperCase() + division.slice(1)}</option>
            ))}
          </select>

          <input 
            type="text" 
            placeholder="Search by name" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>

        {loading ? (
          <p>Loading colleges...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          divisions
            .filter(division => filterDivision === "all" || division === filterDivision)
            .map(division => (
              <div key={division} className="division-container">
                <h3>{division.charAt(0).toUpperCase() + division.slice(1)} Division</h3>
                <ul>
                  {colleges
                    .filter(college => college.division === division)
                    .filter(college => filterType === "all" || college.type === filterType)
                    .filter(college => searchTerm === "" || college.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(college => (
                      <li key={college._id} className="college-item">
                        <a href={`/college/${college._id}`}>{college.name} ({college.type.charAt(0).toUpperCase() + college.type.slice(1)})</a>
                      </li>
                    ))}
                </ul>
              </div>
            ))
        )}
      </div>
    </section>
  );
};

export default Colleges;
