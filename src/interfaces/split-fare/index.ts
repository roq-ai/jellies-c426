import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SplitFareInterface {
  id?: string;
  fare: number;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface SplitFareGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
