import * as yup from 'yup';

export const emergencyValidationSchema = yup.object().shape({
  sos_button: yup.boolean().required(),
  user_id: yup.string().nullable(),
});
