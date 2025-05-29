// src/api.ts

import axios, { type AxiosInstance } from 'axios';

//
// 1. Base URL desde variable de entorno de Vite
//
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

//
// 2. Tipos e interfaces basados en tu esquema de BD
//

// Payload para registro de usuario
export interface RegisterPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  birth_date: string;    // "YYYY-MM-DD"
  country: string;
}

// Respuesta de login
export interface AuthResponse {
  token: string;
  message: string;
}

// Nombres de sección válidos
export type SectionName = 'section1' | 'section2';

// Campos de progreso válidos
export type ProgressField =
  | 'lessons'
  | 'activity_1'
  | 'activity_2'
  | 'activity_3'
  | 'quiz'
  | 'section_complete';

// Payload para doProgress / undoProgress
export interface ProgressPayload {
  section: SectionName;
  field: ProgressField;
  value?: boolean;       // para doProgress (default: true)
}

// Respuesta de do/undo progress
export interface ProgressResponse {
  message: string;
}

// Respuesta de fetchProgress
export interface FetchResponse {
  progress: {
    section1: Record<ProgressField, boolean>;
    section2: Record<ProgressField, boolean>;
  };
}

// Información de perfil de usuario
export interface UserInfo {
  first_name: string;
  last_name: string;
  birth_date: string;    // ISO string
  email: string;
  country: string;
  created_at?: string;   // ISO string
}

// Payload para updateUserInfo
export interface UpdateUserPayload {
  first_name?: string;
  last_name?: string;
  birth_date?: string;   // "YYYY-MM-DD"
  country?: string;
}

// Respuesta de updateUserInfo
export interface UpdateUserResponse {
  message: string;
  updated_fields: string[];
}

//
// 3. Instancia de Axios
//
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Interceptor para inyectar JWT automáticamente
api.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//
// 4. Funciones para cada endpoint
//

/**
 * Registro de nuevo usuario
 */
export async function register(data: RegisterPayload): Promise<void> {
  await api.post<void>('/register', data);
}

/**
 * Login de usuario y almacenamiento de token
 */
export async function login(email: string, password: string): Promise<void> {
  const res = await api.post<AuthResponse>('/login', { email, password });
  localStorage.setItem('jwt_token', res.data.token);
}

/**
 * Cierra sesión eliminando el token
 */
export function logout(): void {
  localStorage.removeItem('jwt_token');
}

/**
 * Marca un campo de progreso como true
 */
export async function doProgress(payload: ProgressPayload): Promise<ProgressResponse> {
  const res = await api.post<ProgressResponse>('/doProgress', payload);
  return res.data;
}

/**
 * Marca un campo de progreso como false
 */
export async function undoProgress(payload: ProgressPayload): Promise<ProgressResponse> {
  const res = await api.post<ProgressResponse>('/undoProgress', payload);
  return res.data;
}

/**
 * Recupera el progreso completo de ambas secciones
 */
export async function fetchProgress(): Promise<FetchResponse> {
  const res = await api.get<FetchResponse>('/fetchProgress');
  return res.data;
}

/**
 * Obtiene la información de perfil del usuario autenticado
 */
export async function getUserInfo(): Promise<{ user_info: UserInfo }> {
  const res = await api.get<{ user_info: UserInfo }>('/userInfo');
  return res.data;
}

/**
 * Actualiza campos editables del perfil de usuario
 */
export async function updateUserInfo(
  updates: UpdateUserPayload
): Promise<UpdateUserResponse> {
  const res = await api.put<UpdateUserResponse>('/updateUser', updates);
  return res.data;
}
