import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; 

export const getAllSchools = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/schools`);
    return response.data;
  } catch (error) {
    console.error("Error fetching schools:", error);
    return [];
  }
};

export const getSchoolById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/schools/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching school:", error);
    return null;
  }
};

export const addReview = async (schoolId, review) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/schools/${schoolId}/reviews`, review);
    return response.data;
  } catch (error) {
    console.error("Error adding review:", error);
    return null;
  }
};
