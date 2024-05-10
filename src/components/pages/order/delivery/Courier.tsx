import { useNavigate } from '@tanstack/react-router';
import { useFormik } from 'formik';
import FormSelect from '../../../../components/forms/Select';
import Button from '../../../Button';
import FormInputText from '../../../forms/InputText';

const dateOptions = [
  { text: '02 March 2024', value: '02-march-2024' },
  { text: '03 March 2024', value: '03-march-2024' },
  { text: '04 March 2024', value: '04-march-2024' },
  { text: '05 March 2024', value: '05-march-2024' },
];

const timeOptions = [
  { text: '10:00-18:00', value: '10:00-18:00' },
  { text: '15:00-20:00', value: '15:00-20:00' },
];

export default function CourierDelivery() {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      address: '',
      street: '',
      house: '',
      room: '',
      extra: '',
      date: '',
      time: '',
    } as FormValues,
    validate: validateForm,
    validateOnChange: false,
    onSubmit: (values) => {
      navigate({to: '/order/payment'})
    },
  });

  return (
    <div className="flex flex-col border-t py-2 pl-8 pr-2">
      <h2 className="mb-0.5 text-headline-medium font-bold text-on-surface">
        Courier delivery
      </h2>
      <span className="mb-4 text-title-small text-on-surface-variant">
        Enter address, date and time for delivery
      </span>
      <form 
      className="flex flex-col gap-3"
      onSubmit={formik.handleSubmit}
      >
        <FormInputText
          id="address"
          required
          label="Address"
          onChange={formik.handleChange}
          value={formik.values.address}
          error={formik.errors.address}
        />
        <FormInputText
          id="street"
          required
          label="Street"
          onChange={formik.handleChange}
          value={formik.values.street}
          error={formik.errors.street}
        />
        <FormInputText
          id="house"
          required
          label="House"
          onChange={formik.handleChange}
          value={formik.values.house}
          error={formik.errors.house}
        />
        <FormInputText
          id="room"
          label="Room"
          onChange={formik.handleChange}
          value={formik.values.room}
          error={formik.errors.room}
        />
        <FormInputText
          id="extra"
          label="Porch, intercom, floor"
          onChange={formik.handleChange}
          value={formik.values.extra}
          error={formik.errors.extra}
        />
        <FormSelect
          id="date"
          label="Date of delivery"
          required
          options={dateOptions}
          selected={formik.values.date}
          error={formik.errors.date}
          onChange={(option) => formik.setFieldValue('date', option)}
        />
        <FormSelect
          id="time"
          label="Time of delivery"
          required
          options={timeOptions}
          selected={formik.values.time}
          error={formik.errors.time}
          onChange={(option) => formik.setFieldValue('time', option)}
        />
        <Button 
        className="mt-3 h-12 text-title-medium"
        type="submit"
        >
          Confirm
        </Button>
      </form>
    </div>
  );
}

interface FormValues {
  address: string;
  street: string;
  house: string;
  room: string;
  extra: string;
  date: string;
  time: string;
}

function validateForm(values: FormValues) {
  const errors: Partial<FormValues> = {};

  if (!values.address) {
    errors.address = 'This field is required';
  }
  if (!values.street) {
    errors.street = 'This field is required';
  }
  if (!values.house) {
    errors.house = 'This field is required';
  }
  if (!values.date) {
    errors.date = 'This field is required';
  }
  if (!values.time) {
    errors.time = 'This field is required';
  }

  return errors;
}
