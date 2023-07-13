import axios from 'axios';
import queryString from 'query-string';
import { SplitFareInterface, SplitFareGetQueryInterface } from 'interfaces/split-fare';
import { GetQueryInterface } from '../../interfaces';

export const getSplitFares = async (query?: SplitFareGetQueryInterface) => {
  const response = await axios.get(`/api/split-fares${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSplitFare = async (splitFare: SplitFareInterface) => {
  const response = await axios.post('/api/split-fares', splitFare);
  return response.data;
};

export const updateSplitFareById = async (id: string, splitFare: SplitFareInterface) => {
  const response = await axios.put(`/api/split-fares/${id}`, splitFare);
  return response.data;
};

export const getSplitFareById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/split-fares/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSplitFareById = async (id: string) => {
  const response = await axios.delete(`/api/split-fares/${id}`);
  return response.data;
};
