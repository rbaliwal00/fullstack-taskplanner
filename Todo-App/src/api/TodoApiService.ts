import axios from "axios"
import { apiClient } from "./AuthenticationApiService";

export const retrieveAllTodosForUserApi = (id:number) => apiClient.get(`/users/${id}/todos`);

export const retrieveTodoApi = (userId: number, id: any) => apiClient.get(`/users/${userId}/todos/${id}`);

export const updateTodoApi = (userId: number, todo:any) => apiClient.put(`/users/${userId}/todos`,todo);

export const deleteTodoApi = (userId: number, id: number) => apiClient.delete(`/users/${userId}/todos/${id}`);

export const createTodoApi = (userId: number, todo:any) => apiClient.post(`/users/${userId}/todos`,todo);