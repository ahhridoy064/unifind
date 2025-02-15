import React, { useEffect, useState } from "react";
import axios from "axios";
import "./university.css";

const API_BASE_URL = "http://localhost:5000"; // Change if backend runs on another port

const Universities = () => {
  const [universities, setUniversities] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [filterDivision, setFilterDivision] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch universities from backend
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/universities`);
        setUniversities(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching universities:", err);
        setError("Failed to load universities.");
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  // Extract divisions dynamically from the fetched universities
  const divisions = [...new Set(universities.map(university => university.division))];

  return (
    <section id="universities" className="universities">
      <div className="container">
        <h2>Universities in Bangladesh</h2>

        <div className="filter-section">
          <button onClick={() => setFilterType("all")} className={filterType === "all" ? "active" : ""}>All</button>
          <button onClick={() => setFilterType("public")} className={filterType === "public" ? "active" : ""}>Public</button>
          <button onClick={() => setFilterType("private")} className={filterType === "private" ? "active" : ""}>Private</button>

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
          <p>Loading universities...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          divisions
            .filter(division => filterDivision === "all" || division === filterDivision)
            .map(division => (
              <div key={division} className="division-container">
                <h3>{division.charAt(0).toUpperCase() + division.slice(1)} Division</h3>
                <ul>
                  {universities
                    .filter(university => university.division === division)
                    .filter(university => filterType === "all" || university.type === filterType)
                    .filter(university => searchTerm === "" || university.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(university => (
                      <li key={university._id} className="university-item">
                        <a href={`/universities/${university._id}`}>{university.name} ({university.type.charAt(0).toUpperCase() + university.type.slice(1)})</a>
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

export default Universities;
