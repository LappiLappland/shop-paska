import { useFormik } from 'formik';
import request from 'graphql-request';
import loginPhoneMutation from '../../../../queries/LoginPhone';
import Button from '../../../Button';
import ButtonOutlined from '../../../ButtonOutlined';
import FormInputText from '../../../forms/InputText';

interface SignInPhoneProps {
  onSwap: () => void;
  onSubmit: (phone: string) => void;
}

export default function SignInPhone({ onSwap, onSubmit }: SignInPhoneProps) {
  const formik = useFormik({
    initialValues: {
      phone: '',
    } as FormValues,
    validate: validateForm,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const payload = await request(
          'http://localhost:8080/',
          loginPhoneMutation,
          { phone: values.phone },
        );

        onSubmit(payload.loginPhone.phone);
      } catch (err) {
        //TODO: show error message
      }
    },
  });

  return (
    <form
      className="flex h-min flex-col items-center rounded-md bg-surface-container-high px-7 py-4 shadow-level-1"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="mb-1 w-full text-left text-title-large font-bold text-on-surface antialiased">
        Sign in by Phone
      </h1>
      <span className="mb-6 w-full text-title-small text-on-surface-variant">
        You will receive SMS message with code
      </span>
      <fieldset className="mb-6 w-full">
        <FormInputText
          id="phone"
          type="phone"
          label="Phone number"
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={formik.errors.phone}
        />
      </fieldset>
      <Button className="mt-1 w-full text-label-large" type="submit" dataTestid='sign-phone'>
        Sign in by phone
      </Button>
      <span className="my-3 flex w-full items-center text-center uppercase text-on-surface-variant before:mr-2 before:grow before:border-t before:border-outline-variant after:ml-2 after:grow after:border-t after:border-outline-variant">
        or
      </span>
      <ButtonOutlined
        className="w-full rounded-button text-label-large"
        rippleClassName="rounded-button"
        type="button"
        onClick={() => onSwap()}
        dataTestid='sign-email'
      >
        Sign in by Email
      </ButtonOutlined>
    </form>
  );
}

interface FormValues {
  phone: string;
}

function validateForm(values: FormValues) {
  const errors: Partial<FormValues> = {};

  if (!values.phone) {
    errors.phone = 'This field is required';
  }

  return errors;
}
