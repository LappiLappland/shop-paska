import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useFormik } from 'formik';
import request from 'graphql-request';
import { useContext, useEffect, useState } from 'react';
import Button from '../../components/Button';
import { UserContext } from '../../components/contexts/UserContext';
import FormInputText from '../../components/forms/InputText';
import { validateEmail } from '../../helpers/validators';
import { pageURL } from '../../mocks/browser';
import getProfileQuery from '../../queries/GetProfile';

export const Route = createFileRoute('/profile/email/')({
  component: EmailComponent,
});

function EmailComponent() {
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
      email: '',
    } as FormValues,
    validate: validateForm,
    validateOnChange: false,
    onSubmit: (values) => {
      setEditMsg({
        isWarning: true,
        text: "We've sent you a mail to verify new address " + values.email,
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
      <div className="flex w-[55%] flex-col items-center justify-center">
        <div className="mb-3 self-start">
          <span className="text-title-small text-on-surface-variant after:mx-2 after:content-['—']">
            Current Email
          </span>
          <span className="text-title-medium font-bold text-on-surface">
            {data?.profile.email}
          </span>
        </div>
        <FormInputText
          className="w-full"
          id="email"
          error={formik.errors.email}
          value={formik.values.email}
          onChange={formik.handleChange}
          label="New email"
        />
        <span
          className={`mt-3 ${editMsg.isWarning ? 'text-yellow-500' : 'text-green-500'}`}
        >
          {editMsg.text}
        </span>
        <Button className="mt-3 w-56" type="submit">
          Confirm Email
        </Button>
      </div>
    </form>
  );
}

interface FormValues {
  email: string;
}

function validateForm(values: FormValues) {
  const errors: Partial<FormValues> = {};

  if (!values.email) {
    errors.email = 'This field is required';
  } else if (!validateEmail(values.email)) {
    errors.email = 'Email has incorrect format';
  }

  return errors;
}
