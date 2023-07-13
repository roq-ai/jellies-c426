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
import { createRideHistory } from 'apiSdk/ride-histories';
import { Error } from 'components/error';
import { rideHistoryValidationSchema } from 'validationSchema/ride-histories';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { RideHistoryInterface } from 'interfaces/ride-history';

function RideHistoryCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: RideHistoryInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createRideHistory(values);
      resetForm();
      router.push('/ride-histories');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<RideHistoryInterface>({
    initialValues: {
      pickup_location: '',
      dropoff_location: '',
      fare: 0,
      driver_info: '',
      trip_duration: 0,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: rideHistoryValidationSchema,
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
            Create Ride History
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="pickup_location" mb="4" isInvalid={!!formik.errors?.pickup_location}>
            <FormLabel>Pickup Location</FormLabel>
            <Input
              type="text"
              name="pickup_location"
              value={formik.values?.pickup_location}
              onChange={formik.handleChange}
            />
            {formik.errors.pickup_location && <FormErrorMessage>{formik.errors?.pickup_location}</FormErrorMessage>}
          </FormControl>
          <FormControl id="dropoff_location" mb="4" isInvalid={!!formik.errors?.dropoff_location}>
            <FormLabel>Dropoff Location</FormLabel>
            <Input
              type="text"
              name="dropoff_location"
              value={formik.values?.dropoff_location}
              onChange={formik.handleChange}
            />
            {formik.errors.dropoff_location && <FormErrorMessage>{formik.errors?.dropoff_location}</FormErrorMessage>}
          </FormControl>
          <FormControl id="fare" mb="4" isInvalid={!!formik.errors?.fare}>
            <FormLabel>Fare</FormLabel>
            <NumberInput
              name="fare"
              value={formik.values?.fare}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('fare', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.fare && <FormErrorMessage>{formik.errors?.fare}</FormErrorMessage>}
          </FormControl>
          <FormControl id="driver_info" mb="4" isInvalid={!!formik.errors?.driver_info}>
            <FormLabel>Driver Info</FormLabel>
            <Input type="text" name="driver_info" value={formik.values?.driver_info} onChange={formik.handleChange} />
            {formik.errors.driver_info && <FormErrorMessage>{formik.errors?.driver_info}</FormErrorMessage>}
          </FormControl>
          <FormControl id="trip_duration" mb="4" isInvalid={!!formik.errors?.trip_duration}>
            <FormLabel>Trip Duration</FormLabel>
            <NumberInput
              name="trip_duration"
              value={formik.values?.trip_duration}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('trip_duration', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.trip_duration && <FormErrorMessage>{formik.errors?.trip_duration}</FormErrorMessage>}
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
    entity: 'ride_history',
    operation: AccessOperationEnum.CREATE,
  }),
)(RideHistoryCreatePage);
