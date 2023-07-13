import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface RideHistoryInterface {
  id?: string;
  pickup_location: string;
  dropoff_location: string;
  fare?: number;
  driver_info?: string;
  trip_duration?: number;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface RideHistoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  pickup_location?: string;
  dropoff_location?: string;
  driver_info?: string;
  user_id?: string;
}
