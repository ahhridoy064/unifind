

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allpageProvider } from "../context/context";
import styles from "./school.module.css"; // Import CSS Module

const API_BASE_URL = "http://localhost:5000"; // Change if backend runs on a different port

const Schools = () => {
  const { setschool } = useContext(allpageProvider);
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);
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

  let filterschoolallcase;

  // Fetch schools from the backend (assuming you have this API setup)
  useEffect(() => {
    if (filterDivision != null) {
      const fetchSchools = async () => {
        try {
          let url = `http://localhost:5000/api/schools`;
          const response = await axios.get(url);
          setSchools(response.data);
        } catch (err) {
          console.error("Error fetching schools:", err);
          setError("Failed to load schools.");
        } finally {
          setLoading(false);
        }
      };

      fetchSchools(); // Fetch schools when filterDivision changes
    }
  }, [filterDivision, filterType, searchTerm]);

  // Filter the schools based on selected division, type, and search term
  const filteredSchools = schools
    .filter(
      (school) => filterDivision === null || school.division === filterDivision
    )
    .filter((school) => filterType === "all" || school.type === filterType)
    .filter(
      (school) =>
        searchTerm === "" ||
        school.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (schools.length > 0) {
    filterschoolallcase = schools.filter((school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const handleSchooldetails = (school) => {
    setschool(school);
    navigate("/school/details");
  };

  return (
    <section id="schools" className={styles.schoolsContainer}>
      <div className={styles.container}>
        <h2>Schools in Bangladesh</h2>

        {/* Division Selection */}
        {filterDivision === null ? (
          <div className={styles.schoolsFilterSection}>
            <h3>Select a Division</h3>
            <ul className={styles.schoolsDivisionList}>
              {divisions.map((division) => (
                <li key={division} className={styles.schoolsDivisionItem}>
                  <button
                    onClick={() => setFilterDivision(division)}
                    className={styles.schoolsDivisionBtn}
                  >
                    {division.charAt(0).toUpperCase() + division.slice(1)} Division
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          // Show filters when a division is selected
          <div className={styles.schoolsFilterSection}>
            <div className={styles.schoolsFilterOptions}>
              <h3>{filterDivision} Division </h3>
              <button
                onClick={() => setFilterDivision(null)}
                className={styles.schoolsBackBtn}
              >
                Back to Division List
              </button>

              {/* Dropdown for Filtering */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className={styles.schoolsFilterDropdown}
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
                className={styles.schoolsSearchInput}
              />
            </div>
          </div>
        )}

        {/* Loading and Error Messages */}
        {loading ? (
          <p className={styles.schoolsLoading}></p>
        ) : error ? (
          <p className={styles.schoolsError}>{error}</p>
        ) : (
          <>
            {/* Show the filtered list of schools */}
            {filterDivision && (
              <h3>
                {filterDivision.charAt(0).toUpperCase() + filterDivision.slice(1)}{" "}
                Division Schools
              </h3>
            )}
            <ul className={styles.schoolsList}>
              {filterschoolallcase != null ? (
                filterschoolallcase.map((school) =>
                  filterType === "all" && filterDivision === school.division ? (
                    <li key={school._id} className={styles.schoolsItem}>
                      <a onClick={() => handleSchooldetails(school)}>
                        {school.division === filterDivision ? (
                          <p>
                            {school.name} (
                            {school.type.charAt(0).toUpperCase() + school.type.slice(1)}
                            )
                          </p>
                        ) : (
                          <p>No School</p>
                        )}
                      </a>
                    </li>
                  ) : filterType === "government" && filterDivision === school.division ? (
                    <li li key={school._id} className={styles.schoolsItem}>
                      <a onClick={() => handleSchooldetails(school)}>
                        {school.type === "government" ? (
                          <p>
                            {school.name} (
                            {school.type.charAt(0).toUpperCase() + school.type.slice(1)}
                            )
                          </p>
                        ) : (
                          <></>
                        )}
                      </a>
                    </li>
                  ) : filterType.includes("non-government") && filterDivision === school.division ? (
                        school.type === "non-government" ? (
                    <li key={school._id} className={styles.schoolsItem}>
                      <a onClick={() => handleSchooldetails(school)}>
                          <p>
                            {school.name} (
                            {school.type.charAt(0).toUpperCase() + school.type.slice(1)}
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


