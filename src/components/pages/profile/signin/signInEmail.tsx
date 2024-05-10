import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { UserContext } from '../../../../components/contexts/UserContext';
import { validateEmail } from '../../../../helpers/validators';
import Button from '../../../Button';
import ButtonOutlined from '../../../ButtonOutlined';
import FormInputText from '../../../forms/InputText';

interface SignInEmailProps {
  onSwap: () => void;
  onSubmit: () => void;
}

export default function SignInEmail({ onSubmit, onSwap }: SignInEmailProps) {
  const { login } = useContext(UserContext);
  const [showError, setShowError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    } as FormValues,
    validate: validateForm,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
        onSubmit();
      } catch (err) {
        setShowError('Incorrect email or password');
      }
    },
  });

  return (
    <form
      className="flex h-min flex-col items-center rounded-md bg-surface-container-high px-7 py-4 shadow-level-1"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="mb-1 w-full text-left text-title-large font-bold text-on-surface antialiased">
        Sign in by Email
      </h1>
      <span className="mb-6 w-full text-title-medium text-on-surface-variant antialiased">
        Only for registered users
      </span>
      <fieldset className="mb-6 w-full">
        <FormInputText
          className="mb-3"
          id="email"
          type="email"
          label="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <FormInputText
          id="password"
          type="password"
          label="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
        />
      </fieldset>
      <span className="text-red-500">{showError}</span>
      <Button className="mt-3 w-full text-label-large font-bold " type="submit" dataTestid='sign'>
        Sign in
      </Button>
      <span className="my-3 flex w-full items-center text-center uppercase text-on-surface-variant before:mr-2 before:grow before:border-t before:border-outline-variant after:ml-2 after:grow after:border-t after:border-outline-variant">
        or
      </span>
      <ButtonOutlined
        className="w-full rounded-button text-label-large font-bold"
        rippleClassName="rounded-button"
        type="button"
        onClick={() => onSwap()}
        dataTestid='sign-phone'
      >
        Sign in by Phone
      </ButtonOutlined>
    </form>
  );
}

interface FormValues {
  email: string;
  password: string;
}

function validateForm(values: FormValues) {
  const errors: Partial<FormValues> = {};

  if (!values.email) {
    errors.email = 'This field is required';
  } else if (!validateEmail(values.email)) {
    errors.email = 'Email has incorrect format';
  }

  if (!values.password) {
    errors.password = 'This field is required';
  }

  return errors;
}
