import axios from 'axios';
import queryString from 'query-string';
import { RideHistoryInterface, RideHistoryGetQueryInterface } from 'interfaces/ride-history';
import { GetQueryInterface } from '../../interfaces';

export const getRideHistories = async (query?: RideHistoryGetQueryInterface) => {
  const response = await axios.get(`/api/ride-histories${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createRideHistory = async (rideHistory: RideHistoryInterface) => {
  const response = await axios.post('/api/ride-histories', rideHistory);
  return response.data;
};

export const updateRideHistoryById = async (id: string, rideHistory: RideHistoryInterface) => {
  const response = await axios.put(`/api/ride-histories/${id}`, rideHistory);
  return response.data;
};

export const getRideHistoryById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/ride-histories/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteRideHistoryById = async (id: string) => {
  const response = await axios.delete(`/api/ride-histories/${id}`);
  return response.data;
};
