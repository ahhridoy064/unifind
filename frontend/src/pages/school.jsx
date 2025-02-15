import React, { useEffect, useState } from "react";
import axios from "axios";
import "./school.css";

const API_BASE_URL = "http://localhost:5000"; // Change if backend runs on a different port

const Schools = () => {
  const [schools, setSchools] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [filterDivision, setFilterDivision] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch schools from backend
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/schools`);
        setSchools(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching schools:", err);
        setError("Failed to load schools.");
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  // Extract divisions dynamically from the fetched schools
  const divisions = [...new Set(schools.map(school => school.division))];

  return (
    <section id="schools" className="schools">
      <div className="container">
        <h2>Schools in Bangladesh</h2>

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
          <p>Loading schools...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          divisions
            .filter(division => filterDivision === "all" || division === filterDivision)
            .map(division => (
              <div key={division} className="division-container">
                <h3>{division.charAt(0).toUpperCase() + division.slice(1)} Division</h3>
                <ul>
                  {schools
                    .filter(school => school.division === division)
                    .filter(school => filterType === "all" || school.type === filterType)
                    .filter(school => searchTerm === "" || school.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(school => (
                      <li key={school._id} className="school-item">
                        <a href={`/school/${school._id}`}>{school.name} ({school.type.charAt(0).toUpperCase() + school.type.slice(1)})</a>
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

export default Schools;
