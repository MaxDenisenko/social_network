import axios, { AxiosResponse } from 'axios';
import authReducer from '../../Redux/AuthReducer';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: { 'API-KEY': '05eb6eff-6789-4df5-9de9-94f2a276a805' },
});
export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10,
}

type LoginResponseType2 = {
  data: { userId: number };
  resultCode: ResultCodesEnum;
  messages: Array<string>;
};

type LoginResponseType = {
  data: { id: number; email: string; login: string };
  resultCode: ResultCodesEnum;
  messages: Array<string>;
};
export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`).then((response) => response.data);
  },
  getProfileUsers(userId: number) {
    console.warn('Please use new object profileAPI');
    return profileAPI.getProfileUsers(userId);
  },
  getAuthDataUsers() {
    return instance.get<LoginResponseType>(`auth/me/`).then((response) => response.data);
  },
  login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
    return instance.post<LoginResponseType2>(`auth/login`, { email, password, rememberMe, captcha });
  },
  logout() {
    return instance.delete(`auth/login`);
  },
  usersFollow(userId: number) {
    return instance.delete(`follow/${userId}`).then((response) => response);
  },
  usersUnFollow(userId: number) {
    return instance.post(`follow/${userId}`).then((response) => response);
  },
};

export const profileAPI = {
  getProfileUsers(userId: number) {
    return instance.get(`profile/${userId}`).then((response) => response.data);
  },
  getProfileStatus(userId: number) {
    return instance.get(`profile/status/${userId}`);
  },
  updateProfileStatus(status: string) {
    return instance.put(`profile/status/`, { status: status });
  },
  savePhoto(file: any) {
    let formData = new FormData();
    formData.append('image', file);
    return instance.put(`profile/photo/`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
};

export const secureAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`);
  },
};
