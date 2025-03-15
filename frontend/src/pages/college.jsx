

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allpageProvider } from "../context/context";
import styles from "./college.module.css"; // Import CSS Module

const API_BASE_URL = "http://localhost:5000"; // Change if backend runs on a different port

const colleges = () => {
  const { setCollege } = useContext(allpageProvider);
  const navigate = useNavigate();
  const [colleges, setcolleges] = useState([]);
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

  let filtercollegeallcase;

  // Fetch colleges from the backend (assuming you have this API setup)
  useEffect(() => {
    if (filterDivision != null) {
      const fetchcolleges = async () => {
        try {
          let url = `http://localhost:5000/api/colleges`;
          const response = await axios.get(url);
          setcolleges(response.data);
        } catch (err) {
          console.error("Error fetching colleges:", err);
          setError("Failed to load colleges.");
        } finally {
          setLoading(false);
        }
      };

      fetchcolleges(); // Fetch colleges when filterDivision changes
    }
  }, [filterDivision, filterType, searchTerm]);

  // Filter the colleges based on selected division, type, and search term
  const filteredcolleges = colleges
    .filter(
      (college) => filterDivision === null || college.division === filterDivision
    )
    .filter((college) => filterType === "all" || college.type === filterType)
    .filter(
      (college) =>
        searchTerm === "" ||
        college.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (colleges.length > 0) {
    filtercollegeallcase = colleges.filter((college) =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const handlecollegedetails = (college) => {
    setCollege(college);
    navigate("/college/details");
  };

  return (
    <section id="colleges" className={styles.collegesContainer}>
      <div className={styles.container}>
        <h2>Colleges in Bangladesh</h2>

        {/* Division Selection */}
        {filterDivision === null ? (
          <div className={styles.collegesFilterSection}>
            <h3>Select a Division</h3>
            <ul className={styles.collegesDivisionList}>
              {divisions.map((division) => (
                <li key={division} className={styles.collegesDivisionItem}>
                  <button
                    onClick={() => setFilterDivision(division)}
                    className={styles.collegesDivisionBtn}
                  >
                    {division.charAt(0).toUpperCase() + division.slice(1)} Division
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          // Show filters when a division is selected
          <div className={styles.collegesFilterSection}>
            <div className={styles.collegesFilterOptions}>
              <h3>{filterDivision} Division </h3>
              <button
                onClick={() => setFilterDivision(null)}
                className={styles.collegesBackBtn}
              >
                Back to Division List
              </button>

              {/* Dropdown for Filtering */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className={styles.collegesFilterDropdown}
              >
                <option value="all">All</option>
                <option value="government">Government</option>
                <option value="non-government">Non-Government</option>
              </select>

              {/* Search by Name Input */}
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.collegesSearchInput}
              />
            </div>
          </div>
        )}

        {/* Loading and Error Messages */}
        {loading ? (
          <p className={styles.collegesLoading}></p>
        ) : error ? (
          <p className={styles.collegesError}>{error}</p>
        ) : (
          <>
            {/* Show the filtered list of colleges */}
            {filterDivision && (
              <h3>
                {filterDivision.charAt(0).toUpperCase() + filterDivision.slice(1)}{" "}
                Division Colleges
              </h3>
            )}
            <ul className={styles.collegesList}>
              {filtercollegeallcase != null ? (
                filtercollegeallcase.map((college) =>
                  filterType === "all" && filterDivision === college.division ? (
                    <li key={college._id} className={styles.collegesItem}>
                      <a onClick={() => handlecollegedetails(college)}>
                        {college.division === filterDivision ? (
                          <p>
                            {college.name} (
                            {college.type.charAt(0).toUpperCase() + college.type.slice(1)}
                            )
                          </p>
                        ) : (
                          <p>No college</p>
                        )}
                      </a>
                    </li>
                  ) : filterType === "government" && filterDivision === college.division ? (
                    <li li key={college._id} className={styles.collegesItem}>
                      <a onClick={() => handlecollegedetails(college)}>
                        {college.type === "government" ? (
                          <p>
                            {college.name} (
                            {college.type.charAt(0).toUpperCase() + college.type.slice(1)}
                            )
                          </p>
                        ) : (
                          <></>
                        )}
                      </a>
                    </li>
                  ) : filterType.includes("non-government") && filterDivision === college.division ? (
                        college.type === "non-government" ? (
                    <li key={college._id} className={styles.collegesItem}>
                      <a onClick={() => handlecollegedetails(college)}>
                          <p>
                            {college.name} (
                            {college.type.charAt(0).toUpperCase() + college.type.slice(1)}
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
                <p>No colleges found.</p>
              )}
            </ul>
          </>
        )}
      </div>
    </section>
  );
};

export default colleges;


