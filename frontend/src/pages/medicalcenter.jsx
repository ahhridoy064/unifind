// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./medical.css";

// const API_BASE_URL = "http://localhost:5000"; // Change if backend runs on a different port

// const medicals = () => {
//   const [medicals, setmedicals] = useState([]);
//   const [filterType, setFilterType] = useState("all");
//   const [filterDivision, setFilterDivision] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch medicals from backend
//   useEffect(() => {
//     const fetchmedicals = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/medicals`);
//         setmedicals(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching medicals:", err);
//         setError("Failed to load medicals.");
//         setLoading(false);
//       }
//     };

//     fetchmedicals();
//   }, []);

//   // Extract divisions dynamically from the fetched medicals
//   const divisions = [...new Set(medicals.map(medical => medical.division))];

//   return (
//     <section id="medicals" className="medicals">
//       <div className="container">
//         <h2>medicals in Bangladesh</h2>

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
//           <p>Loading medicals...</p>
//         ) : error ? (
//           <p>{error}</p>
//         ) : (
//           divisions
//             .filter(division => filterDivision === "all" || division === filterDivision)
//             .map(division => (
//               <div key={division} className="division-container">
//                 <h3>{division.charAt(0).toUpperCase() + division.slice(1)} Division</h3>
//                 <ul>
//                   {medicals
//                     .filter(medical => medical.division === division)
//                     .filter(medical => filterType === "all" || medical.type === filterType)
//                     .filter(medical => searchTerm === "" || medical.name.toLowerCase().includes(searchTerm.toLowerCase()))
//                     .map(medical => (
//                       <li key={medical._id} className="medical-item">
//                         <a href={`/medical/${medical._id}`}>{medical.name} ({medical.type.charAt(0).toUpperCase() + medical.type.slice(1)})</a>
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

// export default medicals;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./medical.css";

// const API_BASE_URL = "http://localhost:5000"; // Change if backend runs on a different port

// const medicals = () => {
//   const [medicals, setmedicals] = useState([]);
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

//   // Fetch medicals from backend
//   useEffect(() => {
//     const fetchmedicals = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/medicals`);
//         setmedicals(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching medicals:", err);
//         setError("Failed to load medicals.");
//         setLoading(false);
//       }
//     };

//     fetchmedicals();
//   }, []);

//   // Extract divisions dynamically from the fetched medicals
//   //const divisions = [...new Set(medicals.map(medical => medical.division))];

//   // Filter the medicals based on the selected division and type
//   const filteredmedicals = medicals
//     .filter(medical => filterDivision === null || medical.division === filterDivision) // Only filter by division if it's selected
//     .filter(medical => filterType === "all" || medical.type === filterType)
//     .filter(medical => searchTerm === "" || medical.name.toLowerCase().includes(searchTerm.toLowerCase()));

//   return (
//     <section id="medicals" className="medicals">
//       <div className="container">
//         <h2>medicals in Bangladesh</h2>

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
//           <p>Loading medicals...</p>
//         ) : error ? (
//           <p>{error}</p>
//         ) : (
//           <>
//             {/* Show the filtered list of medicals */}
//             <h3>{filterDivision.charAt(0).toUpperCase() + filterDivision.slice(1)} Division medicals</h3>
//             <ul>
//               {filteredmedicals.map(medical => (
//                 <li key={medical._id} className="medical-item">
//                   <a href={`/medical/${medical._id}`}>
//                     {medical.name} ({medical.type.charAt(0).toUpperCase() + medical.type.slice(1)})
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

// export default medicals;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./medical.css";

// const API_BASE_URL = "http://localhost:5000"; // Change if backend runs on a different port

// const medicals = () => {
//   const [medicals, setmedicals] = useState([]);
//   const [divisions, setDivisions] = useState([
//     "Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh", "Rajbari", "Cumilla"
//   ]);  // Manually defined divisions
//   const [filterType, setFilterType] = useState("all");
//   const [filterDivision, setFilterDivision] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch medicals from the backend (assuming you have this API setup)
//   useEffect(() => {
//     const fetchmedicals = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/medicals`);
//         setmedicals(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching medicals:", err);
//         setError("Failed to load medicals.");
//         setLoading(false);
//       }
//     };

//     fetchmedicals();
//   }, []);

//   // Filter the medicals based on selected division, type, and search term
//   const filteredmedicals = medicals
//     .filter(medical => filterDivision === null || medical.division === filterDivision)
//     .filter(medical => filterType === "all" || medical.type === filterType)
//     .filter(medical => searchTerm === "" || medical.name.toLowerCase().includes(searchTerm.toLowerCase()));

//   return (
//     <section id="medicals" className="medicals">
//       <div className="container">
//         <h2>medicals in Bangladesh</h2>

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
//           <p>Loading medicals...</p>
//         ) : error ? (
//           <p>{error}</p>
//         ) : (
//           <>
//             {/* Show the filtered list of medicals */}
//             {filterDivision && (
//               <h3>{filterDivision.charAt(0).toUpperCase() + filterDivision.slice(1)} Division medicals</h3>
//             )}
//             <ul>
//               {filteredmedicals.map(medical => (
//                 <li key={medical._id} className="medical-item">
//                   <a href={`/medical/${medical._id}`}>
//                     {medical.name} ({medical.type.charAt(0).toUpperCase() + medical.type.slice(1)})
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

// export default medicals;

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allpageProvider } from "../context/context";
import styles from "./medical.module.css"; // Import CSS Module

const API_BASE_URL = "http://localhost:5000"; // Change if backend runs on a different port

const medicals = () => {
  const { setMedical } = useContext(allpageProvider);
  const navigate = useNavigate();
  const [medicals, setmedicals] = useState([]);
  const [divisions, setDivisions] = useState([
    "Dhaka",
    "Chittagong",
    "Rajshahi",
    "Khulna",
    "Barisal",
    "Sylhet",
    "Rangpur",
    "Mymensingh",
  ]); // Manually defined divisions
  const [filterType, setFilterType] = useState("all");
  const [filterDivision, setFilterDivision] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let filtermedicalallcase;

  // Fetch medicals from the backend (assuming you have this API setup)
  useEffect(() => {
    if (filterDivision != null) {
      const fetchmedicals = async () => {
        try {
          let url = `http://localhost:5000/api/medicals`;
          const response = await axios.get(url);
          setmedicals(response.data);
        } catch (err) {
          console.error("Error fetching medicals:", err);
          setError("Failed to load medicals.");
        } finally {
          setLoading(false);
        }
      };

      fetchmedicals(); // Fetch medicals when filterDivision changes
    }
  }, [filterDivision, filterType, searchTerm]);

  // Filter the medicals based on selected division, type, and search term
  const filteredmedicals = medicals
    .filter(
      (medical) => filterDivision === null || medical.division === filterDivision
    )
    .filter((medical) => filterType === "all" || medical.type === filterType)
    .filter(
      (medical) =>
        searchTerm === "" ||
        medical.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (medicals.length > 0) {
    filtermedicalallcase = medicals.filter((medical) =>
      medical.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const handlemedicaldetails = (medical) => {
    setMedical(medical);
    navigate("/medical/details");
  };

  return (
    <section id="medicals" className={styles.medicalsContainer}>
      <div className={styles.container}>
        <h2>Medicals in Bangladesh</h2>

        {/* Division Selection */}
        {filterDivision === null ? (
          <div className={styles.medicalsFilterSection}>
            <h3>Select a Division</h3>
            <ul className={styles.medicalsDivisionList}>
              {divisions.map((division) => (
                <li key={division} className={styles.medicalsDivisionItem}>
                  <button
                    onClick={() => setFilterDivision(division)}
                    className={styles.medicalsDivisionBtn}
                  >
                    {division.charAt(0).toUpperCase() + division.slice(1)} Division
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          // Show filters when a division is selected
          <div className={styles.medicalsFilterSection}>
            <div className={styles.medicalsFilterOptions}>
              <h3>{filterDivision} Division </h3>
              <button
                onClick={() => setFilterDivision(null)}
                className={styles.medicalsBackBtn}
              >
                Back to Division List
              </button>

              {/* Dropdown for Filtering */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className={styles.medicalsFilterDropdown}
              >
                <option value="all">All</option>
                <option value="government">Government</option>
                <option value="non-government">Private</option>
              </select>

              {/* Search by Name Input */}
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.medicalsSearchInput}
              />
            </div>
          </div>
        )}

        {/* Loading and Error Messages */}
        {loading ? (
          <p className={styles.medicalsLoading}></p>
        ) : error ? (
          <p className={styles.medicalsError}>{error}</p>
        ) : (
          <>
            {/* Show the filtered list of medicals */}
            {filterDivision && (
              <h3>
                {filterDivision.charAt(0).toUpperCase() + filterDivision.slice(1)}{" "}
                Division Medicals
              </h3>
            )}
            <ul className={styles.medicalsList}>
              {filtermedicalallcase != null ? (
                filtermedicalallcase.map((medical) =>
                  filterType === "all" && filterDivision === medical.division ? (
                    <li key={medical._id} className={styles.medicalsItem}>
                      <a onClick={() => handlemedicaldetails(medical)}>
                        {medical.division === filterDivision ? (
                          <p>
                            {medical.name} (
                            {medical.type.charAt(0).toUpperCase() + medical.type.slice(1)}
                            )
                          </p>
                        ) : (
                          <p>No medical</p>
                        )}
                      </a>
                    </li>
                  ) : filterType === "government" && filterDivision === medical.division ? (
                    <li li key={medical._id} className={styles.medicalsItem}>
                      <a onClick={() => handlemedicaldetails(medical)}>
                        {medical.type === "government" ? (
                          <p>
                            {medical.name} (
                            {medical.type.charAt(0).toUpperCase() + medical.type.slice(1)}
                            )
                          </p>
                        ) : (
                          <></>
                        )}
                      </a>
                    </li>
                  ) : filterType.includes("non-government") && filterDivision === medical.division ? (
                        medical.type === "non-government" ? (
                    <li key={medical._id} className={styles.medicalsItem}>
                      <a onClick={() => handlemedicaldetails(medical)}>
                          <p>
                            {medical.name} (
                            {medical.type.charAt(0).toUpperCase() + medical.type.slice(1)}
                            )
                          </p>
                      </a>
                    </li>
                        ) : (
                          <></>
                        )
                  ):(<></>)
                )
              ) : (
                <p>No medicals found.</p>
              )}
            </ul>
          </>
        )}
      </div>
    </section>
  );
};

export default medicals;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./medical.css";

// const API_BASE_URL = "http://localhost:5000"; // Backend server URL

// const medicals = () => {
//   const [medicals, setmedicals] = useState([]);
//   const [divisions] = useState([
//     "Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh"
//   ]);
//   const [filterType, setFilterType] = useState("all");
//   const [filterDivision, setFilterDivision] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch medicals from backend based on filters
//   useEffect(() => {
//     const fetchmedicals = async () => {
//       if (!filterDivision) return;

//       setLoading(true);
//       setError(null);

//       try {
//         let url = `${API_BASE_URL}/medicals?division=${filterDivision}`;
//         if (filterType !== "all") url += `&type=${filterType}`;
//         if (searchTerm) url += `&search=${searchTerm}`;

//         const response = await axios.get(url);
//         setmedicals(response.data);
//       } catch (err) {
//         console.error("Error fetching medicals:", err);
//         setError("Failed to load medicals.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchmedicals();
//   }, [filterDivision, filterType, searchTerm]);

//   return (
//     <section id="medicals" className="medicals">
//       <div className="container">
//         <h2>medicals in Bangladesh</h2>

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

//         {/* medical List */}
//         {loading ? (
//           <p>Loading medicals...</p>
//         ) : error ? (
//           <p>{error}</p>
//         ) : (
//           <>
//             {filterDivision && <h3>{filterDivision} Division medicals</h3>}
//             <ul>
//               {medicals.length > 0 ? (
//                 medicals.map(medical => (
//                   <li key={medical._id} className="medical-item">
//                     <a href={`/medical/${medical._id}`}>
//                       {medical.name} ({medical.type.charAt(0).toUpperCase() + medical.type.slice(1)})
//                     </a>
//                   </li>
//                 ))
//               ) : (
//                 <p>No medicals found.</p>
//               )}
//             </ul>
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default medicals;
