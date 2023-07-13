import { ReviewInterface } from 'interfaces/review';
import { RideInterface } from 'interfaces/ride';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface DriverInterface {
  id?: string;
  name: string;
  photo?: string;
  vehicle_info: string;
  rating?: number;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  review?: ReviewInterface[];
  ride?: RideInterface[];
  user?: UserInterface;
  _count?: {
    review?: number;
    ride?: number;
  };
}

export interface DriverGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  photo?: string;
  vehicle_info?: string;
  user_id?: string;
}
