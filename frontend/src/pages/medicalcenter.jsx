// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./medicalcenter.css";

// const API_BASE_URL = "http://localhost:5000"; // Change if backend runs on another port

// const MedicalCenters = () => {
//   const [medicalCenters, setMedicalCenters] = useState([]);
//   const [filterType, setFilterType] = useState("all");
//   const [filterDivision, setFilterDivision] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch medical centers from backend
//   useEffect(() => {
//     const fetchMedicalCenters = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/medicalcenters`);
//         setMedicalCenters(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching medical centers:", err);
//         setError("Failed to load medical centers.");
//         setLoading(false);
//       }
//     };

//     fetchMedicalCenters();
//   }, []);

//   // Extract divisions dynamically from the fetched medical centers
//   const divisions = [...new Set(medicalCenters.map(center => center.division))];

//   return (
//     <section id="medical-centers" className="medical-centers">
//       <div className="container">
//         <h2>Medical Centers in Bangladesh</h2>

//         <div className="filter-section">
//           <button onClick={() => setFilterType("all")} className={filterType === "all" ? "active" : ""}>All</button>
//           <button onClick={() => setFilterType("public")} className={filterType === "public" ? "active" : ""}>Public</button>
//           <button onClick={() => setFilterType("private")} className={filterType === "private" ? "active" : ""}>Private</button>

//           <select onChange={(e) => setFilterDivision(e.target.value)} value={filterDivision}>
//             <option value="all">All Divisions</option>
//             {divisions.map((division) => (
//               <option key={division} value={division}>{division.charAt(0).toUpperCase() + division.slice(1)}</option>
//             ))}
//           </select>

//           <input 
//             type="text" 
//             placeholder="Search by name" 
//             value={searchQuery} 
//             onChange={(e) => setSearchQuery(e.target.value)} 
//           />
//         </div>

//         {loading ? (
//           <p>Loading medical centers...</p>
//         ) : error ? (
//           <p>{error}</p>
//         ) : (
//           divisions
//             .filter(division => filterDivision === "all" || division === filterDivision)
//             .map(division => (
//               <div key={division} className="division-container">
//                 <h3>{division.charAt(0).toUpperCase() + division.slice(1)} Division</h3>
//                 <ul>
//                   {medicalCenters
//                     .filter(center => center.division === division)
//                     .filter(center => filterType === "all" || center.type === filterType)
//                     .filter(center => searchQuery === "" || center.name.toLowerCase().includes(searchQuery.toLowerCase()))
//                     .map(center => (
//                       <li key={center._id} className="medical-center-item">
//                         <a href={`/medicalcenters/${center._id}`}>{center.name} ({center.type.charAt(0).toUpperCase() + center.type.slice(1)})</a>
//                       </li>
//                     ))}
//                 </ul>
//               </div>
//             ))
//         )}
//       </div>
//     </section>
//   );
// };

// export default MedicalCenters;


import React, {useState, useEffect  } from "react";
import axios from "axios";
import "./medicalcenter.css";

const API_BASE_URL = "http://localhost:5000"; 

const MedicalCenters = () => {
  const [medicalcenters, setMedicalCenters] = useState([]);
  const [divisions, setDivisions] = useState([
      "Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh",
    ]); 
  const [filterType, setFilterType] = useState("all");
  const [filterDivision, setFilterDivision] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchMedicalCenters = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/medicalcenters`);
        setMedicalCenters(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching medicalcenters:", err);
        setError("Failed to load medicalcenters.");
        setLoading(false);
      }
    };

    fetchMedicalCenters();
  }, []);

  //const divisions = [...new Set(colleges.map(college => college.division))];

  const filteredMedicalcenters = medicalcenters
  .filter(medicalcenter => filterDivision === null || medicalcenter.division === filterDivision)
  .filter(medicalcenter => filterType === "all" || medicalcenter.type === filterType)
  .filter(medicalcenter => searchTerm === "" || medicalcenter.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <section id="medicalcenters" className="medicalcenters">
      <div className="container">
        <h2>Medicalcenters in Bangladesh</h2>

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
        <button onClick={() => setFilterType("Private")} className={filterType === "Private" ? "active" : ""}>Private</button>
       

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
          <p>Loading Medicalcenters...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            {/* Show the filtered list of colleges */}
            {filterDivision && (
              <h3>{filterDivision.charAt(0).toUpperCase() + filterDivision.slice(1)} Division Medicalcenters</h3>
            )}
            <ul>
              {filteredMedicalcenters.map(medicalcenter => (
                <li key={medicalcenter._id} className="medicalcenter-item">
                  <a href={`/medicalcenter/${medicalcenter._id}`}>
                    {medicalcenter.name} ({medicalcenter.type.charAt(0).toUpperCase() + medicalcenter.type.slice(1)})
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


export default MedicalCenters;

