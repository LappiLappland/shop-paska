import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { useFormik } from 'formik';
import request from 'graphql-request';
import { useContext, useEffect, useRef, useState } from 'react';
import Button from '../../components/Button';
import UpperLabel from '../../components/UpperLabel';
import { UserContext } from '../../components/contexts/UserContext';
import FormInputText from '../../components/forms/InputText';
import FormSelect, { FormSelectOption } from '../../components/forms/Select';
import { GetProfileQuery, Sex } from '../../gql/graphql';
import { formatDate } from '../../helpers/formatDate';
import getProfileQuery from '../../queries/GetProfile';
import putProfileMainMutation from '../../queries/PutProfileMain';

export const Route = createFileRoute('/profile/account/')({
  component: ProfileComponent,
});

const sexOptions: FormSelectOption[] = [
  { value: 'None', text: "Don't specify" },
  { value: 'M', text: 'Male' },
  { value: 'F', text: 'Female' },
  { value: 'Apache', text: 'Apache' },
];

function ProfileComponent() {
  const { token } = useContext(UserContext);
  const queryClient = useQueryClient();
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const [editMsg, setEditMsg] = useState({
    isError: false,
    text: '',
  });

  const hideMsgTimer = useRef<NodeJS.Timeout | undefined>();

  const { data, isFetched, isSuccess, error } = useQuery({
    queryKey: ['profile', token],
    retry: (failureCount, error) => {
      if (error.message.includes('Token is not valid')) {
        return false;
      }
      return failureCount <= 3;
    },
    queryFn: async () => {
      return request('http://localhost:8080/', getProfileQuery, {});
    },
  });

  function editMainInfo(values: FormValues) {
    return request('http://localhost:8080/', putProfileMainMutation, {
      firstName: values.firstName,
      lastName: values.lastName,
      birth: new Date(values.birth).valueOf(),
      sex: values.sex as Sex,
    });
  }

  const { mutate } = useMutation({
    mutationFn: editMainInfo,
    onSuccess: (data) => {
      queryClient.setQueryData(['profile', token], (prev: GetProfileQuery) => {
        setEditMsg({ isError: false, text: 'Saved successfuly' });

        const newObj = {
          profile: {
            ...prev.profile,
            ...data.profileMain,
          },
        };

        return newObj;
      });
    },
    onError: (error) => {
      setEditMsg({
        isError: true,
        text: error.message,
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      firstName: 'Error',
      lastName: 'Heh',
      birth: '12.12.12',
      sex: 'male',
    } as FormValues,
    validate: validateForm,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  useEffect(() => {
    if (isFetched && isSuccess) {
      const { firstName, lastName, birth, sex } = data!.profile;
      const date = birth ? new Date(birth) : null;
      formik.setValues({
        firstName,
        lastName,
        birth: date ? formatDate(date) : '',
        sex: sex,
      });
    } else if (error && error.message.includes('Token is not valid')) {
      //console.log('TOKEN WAS NOT VALID !!!');
      logout();
      navigate({ to: '/signin' });
    }
  }, [isFetched, error, isSuccess]);

  useEffect(() => {
    clearTimeout(hideMsgTimer.current);
    if (editMsg.text) {
      hideMsgTimer.current = setTimeout(
        () => setEditMsg({ isError: true, text: '' }),
        5000,
      );
    }
  }, [editMsg]);

  return (
    <form
      className="flex grow flex-col items-center justify-center py-12"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex w-full flex-col justify-center gap-12 border-b border-outline-variant pb-12 md:flex-row">
        <div className="flex w-full flex-col items-center md:w-1/2 md:items-end md:pr-32">
          <UpperLabel className="text-title-medium text-on-surface-variant">
            Phone number
          </UpperLabel>
          <span className="block text-title-large font-bold text-on-surface">
            {data?.profile.phone}
          </span>
        </div>
        <div className="flex w-full flex-col items-center md:w-1/2 md:items-start">
          <UpperLabel className="text-title-medium text-on-surface-variant">
            Email
          </UpperLabel>
          <span className="block w-2/3 break-words text-center text-title-large font-bold text-on-surface md:w-full md:text-left lg:w-1/2">
            {data && data.profile.email ? (
              data.profile.email
            ) : (
              <Link className="hover:underline" to="/profile/email">
                Add email
              </Link>
            )}
          </span>
        </div>
      </div>
      <div className="grid min-w-[55%] grid-cols-1 grid-rows-2 gap-16 border-b border-outline-variant py-12 md:grid-cols-2">
        <FormInputText
          id="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.errors.firstName}
          label="First name"
        />
        <FormInputText
          id="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.errors.lastName}
          label="Last name"
        />
        <FormInputText
          id="birth"
          type="date"
          value={formik.values.birth}
          onChange={formik.handleChange}
          error={formik.errors.birth}
          label="Birth"
        />
        <FormSelect
          id="sex"
          options={sexOptions}
          label="Sex"
          selected={formik.values.sex}
          onChange={(option) => formik.setFieldValue('sex', option)}
        />
      </div>
      <span
        className={`mt-3 ${editMsg.isError ? 'text-error' : 'text-green-500'}`}
      >
        {editMsg.text}
      </span>
      <Button className="mt-3 w-56" type="submit" dataTestid="profile-save">
        Save changes
      </Button>
    </form>
  );
}

interface FormValues {
  firstName: string;
  lastName: string;
  birth: string;
  sex: string;
}

function validateForm(values: FormValues) {
  const errors: Partial<FormValues> = {};

  if (!/^[a-zA-Z]*$/.test(values.firstName)) {
    errors.firstName = 'Only letters allowed';
  }

  if (!/^[a-zA-Z]*$/.test(values.lastName)) {
    errors.lastName = 'Only letters allowed';
  }

  return errors;
}
