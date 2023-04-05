import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: { 'API-KEY': '05eb6eff-6789-4df5-9de9-94f2a276a805' },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`).then((response) => response.data);
  },
  getProfileUsers(userId) {
    console.warn('Please use new object profileAPI');
    return profileAPI.getProfileUsers(userId);
  },
  getAuthDataUsers() {
    return instance.get(`auth/me/`).then((response) => response.data);
  },
  login(email, password, rememberMe = false) {
    return instance.post(`auth/login`, { email, password, rememberMe });
  },
  logout() {
    return instance.delete(`auth/login`);
  },
  usersFollow(userId) {
    return instance.delete(`follow/${userId}`).then((response) => response);
  },
  usersUnFollow(userId) {
    return instance.post(`follow/${userId}`).then((response) => response);
  },
};

export const profileAPI = {
  getProfileUsers(userId) {
    return instance.get(`profile/${userId}`).then((response) => response.data);
  },
  getProfileStatus(userId) {
    return instance.get(`profile/status/${userId}`);
  },
  updateProfileStatus(status) {
    return instance.put(`profile/status/`, { status: status });
  },
};
