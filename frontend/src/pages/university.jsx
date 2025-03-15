

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allpageProvider } from "../context/context";
import styles from "./university.module.css"; // Import CSS Module

const API_BASE_URL = "http://localhost:5000"; // Change if backend runs on a different port

const universitys = () => {
  const { setUniversity } = useContext(allpageProvider);
  const navigate = useNavigate();
  const [universitys, setuniversitys] = useState([]);
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

  let filteruniversityallcase;

  // Fetch universitys from the backend (assuming you have this API setup)
  useEffect(() => {
    if (filterDivision != null) {
      const fetchuniversitys = async () => {
        try {
          let url = `http://localhost:5000/api/universitys`;
          const response = await axios.get(url);
          setuniversitys(response.data);
        } catch (err) {
          console.error("Error fetching universitys:", err);
          setError("Failed to load universitys.");
        } finally {
          setLoading(false);
        }
      };

      fetchuniversitys(); // Fetch universitys when filterDivision changes
    }
  }, [filterDivision, filterType, searchTerm]);

  // Filter the universitys based on selected division, type, and search term
  const filtereduniversitys = universitys
    .filter(
      (university) => filterDivision === null || university.division === filterDivision
    )
    .filter((university) => filterType === "all" || university.type === filterType)
    .filter(
      (university) =>
        searchTerm === "" ||
        university.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (universitys.length > 0) {
    filteruniversityallcase = universitys.filter((university) =>
      university.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const handleuniversitydetails = (university) => {
    setUniversity(university);
    navigate("/university/details");
  };

  return (
    <section id="universitys" className={styles.universitysContainer}>
      <div className={styles.container}>
        <h2>Universities in Bangladesh</h2>

        {/* Division Selection */}
        {filterDivision === null ? (
          <div className={styles.universitysFilterSection}>
            <h3>Select a Division</h3>
            <ul className={styles.universitysDivisionList}>
              {divisions.map((division) => (
                <li key={division} className={styles.universitysDivisionItem}>
                  <button
                    onClick={() => setFilterDivision(division)}
                    className={styles.universitysDivisionBtn}
                  >
                    {division.charAt(0).toUpperCase() + division.slice(1)} Division
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          // Show filters when a division is selected
          <div className={styles.universitysFilterSection}>
            <div className={styles.universitysFilterOptions}>
              <h3>{filterDivision} Division </h3>
              <button
                onClick={() => setFilterDivision(null)}
                className={styles.universitysBackBtn}
              >
                Back to Division List
              </button>

              {/* Dropdown for Filtering */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className={styles.universitysFilterDropdown}
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
                className={styles.universitysSearchInput}
              />
            </div>
          </div>
        )}

        {/* Loading and Error Messages */}
        {loading ? (
          <p className={styles.universitysLoading}></p>
        ) : error ? (
          <p className={styles.universitysError}>{error}</p>
        ) : (
          <>
            {/* Show the filtered list of universitys */}
            {filterDivision && (
              <h3>
                {filterDivision.charAt(0).toUpperCase() + filterDivision.slice(1)}{" "}
                Division Universities
              </h3>
            )}
            <ul className={styles.universitysList}>
              {filteruniversityallcase != null ? (
                filteruniversityallcase.map((university) =>
                  filterType === "all" && filterDivision === university.division ? (
                    <li key={university._id} className={styles.universitysItem}>
                      <a onClick={() => handleuniversitydetails(university)}>
                        {university.division === filterDivision ? (
                          <p>
                            {university.name} (
                            {university.type.charAt(0).toUpperCase() + university.type.slice(1)}
                            )
                          </p>
                        ) : (
                          <p>No University</p>
                        )}
                      </a>
                    </li>
                  ) : filterType === "government" && filterDivision === university.division ? (
                    <li li key={university._id} className={styles.universitysItem}>
                      <a onClick={() => handleuniversitydetails(university)}>
                        {university.type === "government" ? (
                          <p>
                            {university.name} (
                            {university.type.charAt(0).toUpperCase() + university.type.slice(1)}
                            )
                          </p>
                        ) : (
                          <></>
                        )}
                      </a>
                    </li>
                  ) : filterType.includes("non-government") && filterDivision === university.division ? (
                        university.type === "non-government" ? (
                    <li key={university._id} className={styles.universitysItem}>
                      <a onClick={() => handleuniversitydetails(university)}>
                          <p>
                            {university.name} (
                            {university.type.charAt(0).toUpperCase() + university.type.slice(1)}
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
                <p>No universities found.</p>
              )}
            </ul>
          </>
        )}
      </div>
    </section>
  );
};

export default universitys;


