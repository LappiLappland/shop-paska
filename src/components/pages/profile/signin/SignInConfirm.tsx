import { useFormik } from 'formik';
import { useContext, useEffect, useRef, useState } from 'react';
import CheckBox from '../../../../components/forms/CheckBox';
import Button from '../../../Button';
import ButtonText from '../../../ButtonText';
import { UserContext } from '../../../contexts/UserContext';
import FormInputText from '../../../forms/InputText';

const againDelay = 10;

interface SignInConfirmProps {
  onSubmit: () => void;
  phone: string;
}

export default function SignInConfirm({ onSubmit, phone }: SignInConfirmProps) {
  const [allowAgain, setAllowAgain] = useState(againDelay);
  const [showError, setShowError] = useState('');

  const { loginPhone } = useContext(UserContext);

  const againTimer = useRef<NodeJS.Timeout | undefined>();

  const formik = useFormik({
    initialValues: {
      code: '',
      agreed: false,
    } as FormValues,
    validate: validateForm,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        await loginPhone(phone, values.code);
        onSubmit();
      } catch (err) {
        setShowError('Incorrect code');
      }
    },
  });

  useEffect(() => {
    if (allowAgain) {
      againTimer.current = setTimeout(
        () => setAllowAgain((curr) => curr - 1),
        1000,
      );
    }

    return () => {
      clearTimeout(againTimer.current);
    };
  }, [allowAgain]);

  function newCodeHandler() {
    setAllowAgain(againDelay);
  }

  return (
    <form
      className="flex min-w-80 grow-0 h-min flex-col items-center rounded-md bg-surface-container-high px-7 py-4 shadow-level-1"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="mb-1 w-full text-left text-title-large font-bold text-on-surface antialiased">
        Confirm phone number
      </h1>
      <span className="w-full text-title-medium text-on-surface-variant antialiased">
        We&apos;ve sent you a 6 digits code on
      </span>
      <span className="mb-4 w-full  text-title-medium text-on-surface-variant">
        {phone}
      </span>
      <fieldset className="mb-6 flex w-full flex-col items-center justify-center">
        <FormInputText
          className="mb-3"
          inputClassName="font-bold tracking-widest text-center"
          id="code"
          label="Code"
          onChange={(e) => {
            formik.handleChange(e);
            setShowError('');
          }}
          min={6}
          max={6}
          type="numeric"
          inputmode="numeric"
          value={formik.values.code}
          error={formik.errors.code}
        />
        <CheckBox
          id="agreed"
          className="self-start"
          text="I agree with stuff"
          error={formik.errors.agreed}
          checked={formik.values.agreed}
          onChange={formik.handleChange}
        />
      </fieldset>
      <span className="text-red-500">{showError}</span>
      <Button className="mb-3 w-full text-label-large font-bold" type="submit" dataTestid='sign'>
        Sign up
      </Button>
      <ButtonText
        className="rounded-button flex flex-col text-label-large font-semibold"
        type="button"
        onClick={newCodeHandler}
      >
        {allowAgain
          ? (
            <>
              <span>You can send new code in</span>
              <span>{allowAgain} seconds</span>
            </>
          )
          : 'Send new code'}
      </ButtonText>
    </form>
  );
}

interface FormValues {
  code: string;
  agreed: boolean;
}

function validateForm(values: FormValues) {
  const errors: Partial<FormValues> = {};

  if (!values.code) {
    errors.code = 'This field is required';
  } else if (values.code.length !== 6) {
    errors.code = 'Must be 6 digits long';
  }

  if (!values.agreed) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    errors.agreed = 'Must agree to our terms'; //! mita helvettia ?
  }

  return errors;
}
