import { UserInterface } from 'interfaces/user';
import { DriverInterface } from 'interfaces/driver';
import { GetQueryInterface } from 'interfaces';

export interface RideInterface {
  id?: string;
  pickup_location: string;
  dropoff_location: string;
  fare_estimate?: number;
  user_id?: string;
  driver_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  driver?: DriverInterface;
  _count?: {};
}

export interface RideGetQueryInterface extends GetQueryInterface {
  id?: string;
  pickup_location?: string;
  dropoff_location?: string;
  user_id?: string;
  driver_id?: string;
}
