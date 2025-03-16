// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./school.css";

// const API_BASE_URL = "http://localhost:5000"; // Change if backend runs on a different port

// const Schools = () => {
//   const [schools, setSchools] = useState([]);
//   const [filterType, setFilterType] = useState("all");
//   const [filterDivision, setFilterDivision] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch schools from backend
//   useEffect(() => {
//     const fetchSchools = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/schools`);
//         setSchools(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching schools:", err);
//         setError("Failed to load schools.");
//         setLoading(false);
//       }
//     };

//     fetchSchools();
//   }, []);

//   // Extract divisions dynamically from the fetched schools
//   const divisions = [...new Set(schools.map(school => school.division))];

//   return (
//     <section id="schools" className="schools">
//       <div className="container">
//         <h2>Schools in Bangladesh</h2>

//         <div className="filter-section">
//           <button onClick={() => setFilterType("all")} className={filterType === "all" ? "active" : ""}>All</button>
//           <button onClick={() => setFilterType("government")} className={filterType === "government" ? "active" : ""}>Government</button>
//           <button onClick={() => setFilterType("non-government")} className={filterType === "non-government" ? "active" : ""}>Non-Government</button>

//           <select onChange={(e) => setFilterDivision(e.target.value)} value={filterDivision}>
//             <option value="all">All Divisions</option>
//             {divisions.map((division) => (
//               <option key={division} value={division}>{division.charAt(0).toUpperCase() + division.slice(1)}</option>
//             ))}
//           </select>

//           <input
//             type="text"
//             placeholder="Search by name"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {loading ? (
//           <p>Loading schools...</p>
//         ) : error ? (
//           <p>{error}</p>
//         ) : (
//           divisions
//             .filter(division => filterDivision === "all" || division === filterDivision)
//             .map(division => (
//               <div key={division} className="division-container">
//                 <h3>{division.charAt(0).toUpperCase() + division.slice(1)} Division</h3>
//                 <ul>
//                   {schools
//                     .filter(school => school.division === division)
//                     .filter(school => filterType === "all" || school.type === filterType)
//                     .filter(school => searchTerm === "" || school.name.toLowerCase().includes(searchTerm.toLowerCase()))
//                     .map(school => (
//                       <li key={school._id} className="school-item">
//                         <a href={`/school/${school._id}`}>{school.name} ({school.type.charAt(0).toUpperCase() + school.type.slice(1)})</a>
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

// export default Schools;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./school.css";

// const API_BASE_URL = "http://localhost:5000"; // Change if backend runs on a different port

// const Schools = () => {
//   const [schools, setSchools] = useState([]);
//   const [divisions, setDivisions] = useState([
//     "Dhaka",
//     "Chittagong", 
//     "Rajshahi", 
//     "Khulna", 
//     "Barisal", 
//     "Sylhet", 
//     "Rangpur", 
//     "Mymensingh",
//   ]); 
//   const [filterType, setFilterType] = useState("all");
//   const [filterDivision, setFilterDivision] = useState(null); // Start with null instead of "all"
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch schools from backend
//   useEffect(() => {
//     const fetchSchools = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/schools`);
//         setSchools(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching schools:", err);
//         setError("Failed to load schools.");
//         setLoading(false);
//       }
//     };

//     fetchSchools();
//   }, []);

//   // Extract divisions dynamically from the fetched schools
//   //const divisions = [...new Set(schools.map(school => school.division))];

//   // Filter the schools based on the selected division and type
//   const filteredSchools = schools
//     .filter(school => filterDivision === null || school.division === filterDivision) // Only filter by division if it's selected
//     .filter(school => filterType === "all" || school.type === filterType)
//     .filter(school => searchTerm === "" || school.name.toLowerCase().includes(searchTerm.toLowerCase()));

//   return (
//     <section id="schools" className="schools">
//       <div className="container">
//         <h2>Schools in Bangladesh</h2>

//         {/* Division Selection */}
//         {filterDivision === null ? (
//           <div className="filter-section">
//             <h3>Select a Division</h3>
//             {divisions.map((division) => (
//               <button
//                 key={division}
//                 onClick={() => setFilterDivision(division)}
//                 className="division-btn"
//               >
//                 {division.charAt(0).toUpperCase() + division.slice(1)} Division
//               </button>
//             ))}
//           </div>
//         ) : (
//           // Show filters when a division is selected
//           <div className="filter-section">
//             <button onClick={() => setFilterType("all")} className={filterType === "all" ? "active" : ""}>All</button>
//             <button onClick={() => setFilterType("government")} className={filterType === "government" ? "active" : ""}>Government</button>
//             <button onClick={() => setFilterType("non-government")} className={filterType === "non-government" ? "active" : ""}>Non-Government</button>

//             <input
//               type="text"
//               placeholder="Search by name"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         )}

//         {loading ? (
//           <p>Loading schools...</p>
//         ) : error ? (
//           <p>{error}</p>
//         ) : (
//           <>
//             {/* Show the filtered list of schools */}
//             <h3>{filterDivision.charAt(0).toUpperCase() + filterDivision.slice(1)} Division Schools</h3>
//             <ul>
//               {filteredSchools.map(school => (
//                 <li key={school._id} className="school-item">
//                   <a href={`/school/${school._id}`}>
//                     {school.name} ({school.type.charAt(0).toUpperCase() + school.type.slice(1)})
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Schools;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./school.css";

// const API_BASE_URL = "http://localhost:5000"; // Change if backend runs on a different port

// const Schools = () => {
//   const [schools, setSchools] = useState([]);
//   const [divisions, setDivisions] = useState([
//     "Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh", "Rajbari", "Cumilla"
//   ]);  // Manually defined divisions
//   const [filterType, setFilterType] = useState("all");
//   const [filterDivision, setFilterDivision] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch schools from the backend (assuming you have this API setup)
//   useEffect(() => {
//     const fetchSchools = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/schools`);
//         setSchools(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching schools:", err);
//         setError("Failed to load schools.");
//         setLoading(false);
//       }
//     };

//     fetchSchools();
//   }, []);

//   // Filter the schools based on selected division, type, and search term
//   const filteredSchools = schools
//     .filter(school => filterDivision === null || school.division === filterDivision)
//     .filter(school => filterType === "all" || school.type === filterType)
//     .filter(school => searchTerm === "" || school.name.toLowerCase().includes(searchTerm.toLowerCase()));

//   return (
//     <section id="schools" className="schools">
//       <div className="container">
//         <h2>Schools in Bangladesh</h2>

//         {/* Division Selection */}
//         {filterDivision === null ? (
//           <div className="filter-section">
//             <h3>Select a Division</h3>
//             {divisions.map((division) => (
//               <div key={division} className="division-list">
//                 <button
//                   onClick={() => setFilterDivision(division)}
//                   className="division-btn"
//                 >
//                   {division.charAt(0).toUpperCase() + division.slice(1)} Division
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           // Show filters when a division is selected
//           <div className="filter-section">
//             <h3>{filterDivision} Division</h3>
//             <button onClick={() => setFilterDivision(null)} className="back-btn">
//               Back to Division List
//             </button>

//             <button onClick={() => setFilterType("all")} className={filterType === "all" ? "active" : ""}>All</button>
//             <button onClick={() => setFilterType("government")} className={filterType === "government" ? "active" : ""}>Government</button>
//             <button onClick={() => setFilterType("non-government")} className={filterType === "non-government" ? "active" : ""}>Non-Government</button>

//             <input
//               type="text"
//               placeholder="Search by name"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         )}

//         {loading ? (
//           <p>Loading schools...</p>
//         ) : error ? (
//           <p>{error}</p>
//         ) : (
//           <>
//             {/* Show the filtered list of schools */}
//             {filterDivision && (
//               <h3>{filterDivision.charAt(0).toUpperCase() + filterDivision.slice(1)} Division Schools</h3>
//             )}
//             <ul>
//               {filteredSchools.map(school => (
//                 <li key={school._id} className="school-item">
//                   <a href={`/school/${school._id}`}>
//                     {school.name} ({school.type.charAt(0).toUpperCase() + school.type.slice(1)})
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Schools;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./school.css";

const API_BASE_URL = "http://localhost:5000"; // Change if backend runs on a different port

const Schools = () => {
  const [schools, setSchools] = useState([]);
  const [divisions, setDivisions] = useState([
    "Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh",
  ]);  // Manually defined divisions
  const [filterType, setFilterType] = useState("all");
  const [filterDivision, setFilterDivision] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch schools from the backend (assuming you have this API setup)
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        let url = `${API_BASE_URL}/schools?division=${filterDivision}`;
        if (filterType !== "all") {
          url += `&type=${filterType}`;
      }
      if (searchTerm) {
          url += `&search=${searchTerm}`;
      }
        const response = await axios.get(url);
        setSchools(response.data);
       // setLoading(false);
      } catch (err) {
        console.error("Error fetching schools:", err);
        setError("Failed to load schools.");
       // setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    if (filterDivision) {
      fetchSchools();
  }
}, [filterDivision, filterType, searchTerm]);

  // Filter the schools based on selected division, type, and search term
  const filteredSchools = schools
    .filter(school => filterDivision === null || school.division === filterDivision)
    .filter(school => filterType === "all" || school.type === filterType)
    .filter(school => searchTerm === "" || school.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <section id="schools" className="schools">
      <div className="container">
        <h2>Schools in Bangladesh</h2>

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
          // <div className="filter-section">
          //    <div className="filter-options">
          //   <h3>{filterDivision} Division</h3>
          //   <button onClick={() => setFilterDivision(null)} className="back-btn">
          //     Back to Division List
          //   </button>
            
           
          //   <button onClick={() => setFilterType("all")} className={filterType === "all" ? "active" : ""}>All</button>
          //   <button onClick={() => setFilterType("government")} className={filterType === "government" ? "active" : ""}>Government</button>
          //   <button onClick={() => setFilterType("non-government")} className={filterType === "non-government" ? "active" : ""}>Non-Government</button>
           

          //   <input
          //     type="text"
          //     placeholder="Search by name"
          //     value={searchTerm}
          //     onChange={(e) => setSearchTerm(e.target.value)}
          //   />
          //    </div>
          // </div>

          <div className="filter-section">
  <div className="filter-options">
    <h3>{filterDivision} Division</h3>
    <button onClick={() => setFilterDivision(null)} className="back-btn">
      Back to Division List
    </button>

    {/* **Dropdown for Filtering** */}
    <select
      value={filterType}
      onChange={(e) => setFilterType(e.target.value)}
      className="filter-dropdown"
    >
      <option value="all">All</option>
      <option value="government">Government</option>
      <option value="non-government">Non-Government</option>
    </select>

    {/* **Search by Name Input** */}
    <input
      type="text"
      placeholder="Search by name..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-input"
    />
  </div>
</div>

        )}

        {loading ? (
          <p>Loading schools...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            {/* Show the filtered list of schools */}
            {filterDivision && (
              <h3>{filterDivision.charAt(0).toUpperCase() + filterDivision.slice(1)} Division Schools</h3>
            )}
            <ul>
            {schools.length > 0 ? (
              schools.map(school => (
              
                <li key={school._id} className="school-item">
                  <a href={`/school/${school._id}`}>
                    {school.name} ({school.type.charAt(0).toUpperCase() + school.type.slice(1)})
                  </a>
                </li>
              ))
            ) : (
              <p>No schools found.</p>
            )}
              
            </ul>
          </>
        )}
      </div>
    </section>
  );
};

export default Schools;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./school.css";

// const API_BASE_URL = "http://localhost:5000"; // Backend server URL

// const Schools = () => {
//   const [schools, setSchools] = useState([]);
//   const [divisions] = useState([
//     "Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh"
//   ]);
//   const [filterType, setFilterType] = useState("all");
//   const [filterDivision, setFilterDivision] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch schools from backend based on filters
//   useEffect(() => {
//     const fetchSchools = async () => {
//       if (!filterDivision) return;
      
//       setLoading(true);
//       setError(null);

//       try {
//         let url = `${API_BASE_URL}/schools?division=${filterDivision}`;
//         if (filterType !== "all") url += `&type=${filterType}`;
//         if (searchTerm) url += `&search=${searchTerm}`;

//         const response = await axios.get(url);
//         setSchools(response.data);
//       } catch (err) {
//         console.error("Error fetching schools:", err);
//         setError("Failed to load schools.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSchools();
//   }, [filterDivision, filterType, searchTerm]);

//   return (
//     <section id="schools" className="schools">
//       <div className="container">
//         <h2>Schools in Bangladesh</h2>

//         {/* Division Selection */}
//         {!filterDivision ? (
//           <div className="filter-section">
//             <h3>Select a Division</h3>
//             <ul className="division-list">
//               {divisions.map((division) => (
//                 <li key={division} className="division-item">
//                   <button
//                     onClick={() => setFilterDivision(division)}
//                     className="division-btn"
//                   >
//                     {division} Division
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ) : (
//           <div className="filter-section">
//             <h3>{filterDivision} Division</h3>
//             <button onClick={() => setFilterDivision(null)} className="back-btn">Back to Division List</button>
            
//             {/* Filter Buttons */}
//             <div className="filter-options">
//               <button onClick={() => setFilterType("all")} className={filterType === "all" ? "active" : ""}>All</button>
//               <button onClick={() => setFilterType("government")} className={filterType === "government" ? "active" : ""}>Government</button>
//               <button onClick={() => setFilterType("non-government")} className={filterType === "non-government" ? "active" : ""}>Non-Government</button>
              
//               {/* Search Input */}
//               <input
//                 type="text"
//                 placeholder="Search by name"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>
//         )}

//         {/* School List */}
//         {loading ? (
//           <p>Loading schools...</p>
//         ) : error ? (
//           <p>{error}</p>
//         ) : (
//           <>
//             {filterDivision && <h3>{filterDivision} Division Schools</h3>}
//             <ul>
//               {schools.length > 0 ? (
//                 schools.map(school => (
//                   <li key={school._id} className="school-item">
//                     <a href={`/school/${school._id}`}>
//                       {school.name} ({school.type.charAt(0).toUpperCase() + school.type.slice(1)})
//                     </a>
//                   </li>
//                 ))
//               ) : (
//                 <p>No schools found.</p>
//               )}
//             </ul>
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Schools;
