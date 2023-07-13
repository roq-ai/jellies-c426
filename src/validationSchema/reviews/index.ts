import * as yup from 'yup';

export const reviewValidationSchema = yup.object().shape({
  rating: yup.number().integer().required(),
  feedback: yup.string(),
  user_id: yup.string().nullable(),
  driver_id: yup.string().nullable(),
});
