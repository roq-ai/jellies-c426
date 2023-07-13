import axios from 'axios';
import queryString from 'query-string';
import { EmergencyInterface, EmergencyGetQueryInterface } from 'interfaces/emergency';
import { GetQueryInterface } from '../../interfaces';

export const getEmergencies = async (query?: EmergencyGetQueryInterface) => {
  const response = await axios.get(`/api/emergencies${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEmergency = async (emergency: EmergencyInterface) => {
  const response = await axios.post('/api/emergencies', emergency);
  return response.data;
};

export const updateEmergencyById = async (id: string, emergency: EmergencyInterface) => {
  const response = await axios.put(`/api/emergencies/${id}`, emergency);
  return response.data;
};

export const getEmergencyById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/emergencies/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteEmergencyById = async (id: string) => {
  const response = await axios.delete(`/api/emergencies/${id}`);
  return response.data;
};
