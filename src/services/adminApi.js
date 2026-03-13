import axios from "axios";

const API = "http://localhost:5000/api/admin";

export const getAdminStats = async (token) => {
  return axios.get(`${API}/stats`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getUsers = async (token) => {
  return axios.get(`${API}/users`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const deleteUser = async (id, token) => {
  return axios.delete(`${API}/user/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getNotifications = async (token) => {
  return axios.get(`${API}/notifications`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getAllJobs = async (token) => {
  return axios.get(`${API}/jobs`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateJobStatus = async (id, status, token) => {
  return axios.put(`${API}/job/${id}/status`, { status }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};