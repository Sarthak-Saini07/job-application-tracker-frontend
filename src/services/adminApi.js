import axiosInstance from "./axiosInstance";

export const getAdminStats = async (token) => {
  return axiosInstance.get(`/admin/stats`);
};

export const getUsers = async (token) => {
  return axiosInstance.get(`/admin/users`);
};

export const deleteUser = async (id, token) => {
  return axiosInstance.delete(`/admin/user/${id}`);
};

export const getNotifications = async (token, page = 1, limit = 10) => {
  return axiosInstance.get(`/admin/notifications?page=${page}&limit=${limit}`);
};

export const getAllJobs = async (token) => {
  return axiosInstance.get(`/admin/jobs`);
};

export const updateJobStatus = async (id, status, token) => {
  return axiosInstance.put(`/admin/job/${id}/status`, { status });
};