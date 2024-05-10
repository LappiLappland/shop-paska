import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useFormik } from 'formik';
import request from 'graphql-request';
import { useContext, useEffect, useState } from 'react';
import Button from '../../components/Button';
import { UserContext } from '../../components/contexts/UserContext';
import FormInputText from '../../components/forms/InputText';
import { validatePassword } from '../../helpers/validators';
import { pageURL } from '../../mocks/browser';
import getProfileQuery from '../../queries/GetProfile';

export const Route = createFileRoute('/profile/password/')({
  component: PasswordComponent,
});

function PasswordComponent() {
  const { token } = useContext(UserContext);
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const [editMsg, setEditMsg] = useState({
    isWarning: false,
    text: '',
  });

  const { data, error } = useQuery({
    queryKey: ['profile', token],
    retry: (failureCount, error) => {
      if (error.message.includes('Token is not valid')) {
        return false;
      }
      return failureCount <= 3;
    },
    queryFn: async () => {
      return request(pageURL, getProfileQuery, {});
    },
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      passwordConfirm: '',
    } as FormValues,
    validate: validateForm,
    onSubmit: () => {
      setEditMsg({
        isWarning: true,
        text: "We've sent you a code to confirm new password",
      });
    },
  });

  useEffect(() => {
    if (error && error.message.includes('Token is not valid')) {
      logout();
      navigate({ to: '/signin' });
    }
  }, [error]);

  return (
    <form
      className="flex grow flex-col items-center justify-center py-12"
      onSubmit={formik.handleSubmit}
    >
      <div className="w-[55%]">
        <div className="mb-3">
          <span className="text-title-small text-on-surface-variant after:mx-2 after:content-['—']">
            Confirmation code will be sent to
          </span>
          <span className="text-title-medium font-bold text-on-surface">
            {data?.profile.phone}
          </span>
        </div>
        <FormInputText
          className="mb-3"
          id="password"
          value={formik.values.password}
          error={formik.errors.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="password"
          label="New password"
        />
        <FormInputText
          id="passwordConfirm"
          value={formik.values.passwordConfirm}
          error={
            formik.touched.passwordConfirm ? formik.errors.passwordConfirm : ''
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="password"
          label="Repeat password"
        />
        <span
          className={`mt-3 ${editMsg.isWarning ? 'text-yellow-500' : 'text-green-500'}`}
        >
          {editMsg.text}
        </span>
        <Button className="mt-6 w-56">Change password</Button>
      </div>
    </form>
  );
}

interface FormValues {
  password: string;
  passwordConfirm: string;
}

function validateForm(values: FormValues) {
  const errors: Partial<FormValues> = {};

  if (!values.password) {
    errors.password = 'This field is required';
  } else if (!validatePassword(values.password)) {
    errors.password =
      'Password must be at least 8 characters long and contain a number, a special character, an upper case letter and a lower case letter';
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'This field is required';
  } else if (values.passwordConfirm !== values.password) {
    errors.passwordConfirm = 'Passwords do not match';
  }

  return errors;
}
