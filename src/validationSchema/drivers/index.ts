import * as yup from 'yup';

export const driverValidationSchema = yup.object().shape({
  name: yup.string().required(),
  photo: yup.string(),
  vehicle_info: yup.string().required(),
  rating: yup.number().integer(),
  user_id: yup.string().nullable(),
});
