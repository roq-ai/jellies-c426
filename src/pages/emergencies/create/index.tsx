import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createEmergency } from 'apiSdk/emergencies';
import { Error } from 'components/error';
import { emergencyValidationSchema } from 'validationSchema/emergencies';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { EmergencyInterface } from 'interfaces/emergency';

function EmergencyCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: EmergencyInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createEmergency(values);
      resetForm();
      router.push('/emergencies');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<EmergencyInterface>({
    initialValues: {
      sos_button: false,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: emergencyValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Emergency
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl
            id="sos_button"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.sos_button}
          >
            <FormLabel htmlFor="switch-sos_button">Sos Button</FormLabel>
            <Switch
              id="switch-sos_button"
              name="sos_button"
              onChange={formik.handleChange}
              value={formik.values?.sos_button ? 1 : 0}
            />
            {formik.errors?.sos_button && <FormErrorMessage>{formik.errors?.sos_button}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'emergency',
    operation: AccessOperationEnum.CREATE,
  }),
)(EmergencyCreatePage);
