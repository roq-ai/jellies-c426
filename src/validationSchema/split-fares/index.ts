import * as yup from 'yup';

export const splitFareValidationSchema = yup.object().shape({
  fare: yup.number().integer().required(),
  user_id: yup.string().nullable(),
});
