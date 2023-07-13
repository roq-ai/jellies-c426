import * as yup from 'yup';

export const rideValidationSchema = yup.object().shape({
  pickup_location: yup.string().required(),
  dropoff_location: yup.string().required(),
  fare_estimate: yup.number().integer(),
  user_id: yup.string().nullable(),
  driver_id: yup.string().nullable(),
});
