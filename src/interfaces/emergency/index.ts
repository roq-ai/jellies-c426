import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface EmergencyInterface {
  id?: string;
  sos_button: boolean;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface EmergencyGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
