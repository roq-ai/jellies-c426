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
import { createDriver } from 'apiSdk/drivers';
import { Error } from 'components/error';
import { driverValidationSchema } from 'validationSchema/drivers';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { DriverInterface } from 'interfaces/driver';

function DriverCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: DriverInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createDriver(values);
      resetForm();
      router.push('/drivers');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<DriverInterface>({
    initialValues: {
      name: '',
      photo: '',
      vehicle_info: '',
      rating: 0,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: driverValidationSchema,
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
            Create Driver
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="photo" mb="4" isInvalid={!!formik.errors?.photo}>
            <FormLabel>Photo</FormLabel>
            <Input type="text" name="photo" value={formik.values?.photo} onChange={formik.handleChange} />
            {formik.errors.photo && <FormErrorMessage>{formik.errors?.photo}</FormErrorMessage>}
          </FormControl>
          <FormControl id="vehicle_info" mb="4" isInvalid={!!formik.errors?.vehicle_info}>
            <FormLabel>Vehicle Info</FormLabel>
            <Input type="text" name="vehicle_info" value={formik.values?.vehicle_info} onChange={formik.handleChange} />
            {formik.errors.vehicle_info && <FormErrorMessage>{formik.errors?.vehicle_info}</FormErrorMessage>}
          </FormControl>
          <FormControl id="rating" mb="4" isInvalid={!!formik.errors?.rating}>
            <FormLabel>Rating</FormLabel>
            <NumberInput
              name="rating"
              value={formik.values?.rating}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('rating', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.rating && <FormErrorMessage>{formik.errors?.rating}</FormErrorMessage>}
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
    entity: 'driver',
    operation: AccessOperationEnum.CREATE,
  }),
)(DriverCreatePage);
