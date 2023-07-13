import * as yup from 'yup';

export const rideHistoryValidationSchema = yup.object().shape({
  pickup_location: yup.string().required(),
  dropoff_location: yup.string().required(),
  fare: yup.number().integer(),
  driver_info: yup.string(),
  trip_duration: yup.number().integer(),
  user_id: yup.string().nullable(),
});
