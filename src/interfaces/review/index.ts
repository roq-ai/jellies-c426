import { UserInterface } from 'interfaces/user';
import { DriverInterface } from 'interfaces/driver';
import { GetQueryInterface } from 'interfaces';

export interface ReviewInterface {
  id?: string;
  rating: number;
  feedback?: string;
  user_id?: string;
  driver_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  driver?: DriverInterface;
  _count?: {};
}

export interface ReviewGetQueryInterface extends GetQueryInterface {
  id?: string;
  feedback?: string;
  user_id?: string;
  driver_id?: string;
}
