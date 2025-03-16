import React, {useState, useEffect  } from "react";
import axios from "axios";
import "./college.css";

const API_BASE_URL = "http://localhost:5000"; 

const Colleges = () => {
  const [colleges, setColleges] = useState([]);
  const [divisions, setDivisions] = useState([
      "Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh",
    ]); 
  const [filterType, setFilterType] = useState("all");
  const [filterDivision, setFilterDivision] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


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

  //const divisions = [...new Set(colleges.map(college => college.division))];

  const filteredColleges = colleges
  .filter(college => filterDivision === null || college.division === filterDivision)
  .filter(college => filterType === "all" || college.type === filterType)
  .filter(college => searchTerm === "" || college.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <section id="colleges" className="colleges">
      <div className="container">
        <h2>Colleges in Bangladesh</h2>

         {/* Division Selection */}
         {filterDivision === null ? (
          <div className="filter-section">
            <h3>Select a Division</h3>
            <ul className="division-list">
              {divisions.map((division) => (
                <li key={division} className="division-item">
                  <button
                    onClick={() => setFilterDivision(division)}
                    className="division-btn"
                  >
                    {division.charAt(0).toUpperCase() + division.slice(1)} Division
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (

         // Show filters when a division is selected
         <div className="filter-section">
         <div className="filter-options">
        <h3>{filterDivision} Division</h3>
        <button onClick={() => setFilterDivision(null)} className="back-btn">
          Back to Division List
        </button>
        
       
        <button onClick={() => setFilterType("all")} className={filterType === "all" ? "active" : ""}>All</button>
        <button onClick={() => setFilterType("government")} className={filterType === "government" ? "active" : ""}>Government</button>
        <button onClick={() => setFilterType("non-government")} className={filterType === "non-government" ? "active" : ""}>Non-Government</button>
       

        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
         </div>
      </div>
    )}

        {loading ? (
          <p>Loading colleges...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            {/* Show the filtered list of colleges */}
            {filterDivision && (
              <h3>{filterDivision.charAt(0).toUpperCase() + filterDivision.slice(1)} Division Colleges</h3>
            )}
            <ul>
              {filteredColleges.map(college => (
                <li key={college._id} className="college-item">
                  <a href={`/college/${college._id}`}>
                    {college.name} ({college.type.charAt(0).toUpperCase() + college.type.slice(1)})
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
};


export default Colleges;
