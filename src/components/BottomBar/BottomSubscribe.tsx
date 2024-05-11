import { useState } from 'react';
import envelope from '../../assets/img/envelop.svg';
import Button from '../Button';
import CheckBox from '../forms/CheckBox';

export default function BottomSubscribe() {
  const [agreed, setAgreed] = useState(false);

  return (
    <section className="miw-w-[60%] md:min-w-full lg:min-w-[60%] mt-8 flex flex-col items-center justify-between border p-6 md:flex-row">
      <div className="mb-6 flex basis-1/2 items-center md:mb-0">
        <img className="mr-4 h-8" src={envelope} alt="" />
        <p className="text-headline-small antialiased">Subscribie for news</p>
      </div>
      <form 
        className="flex grow flex-col items-center gap-4 md:flex-row"
        onSubmit={(e) => e.preventDefault()}
      >
        <fieldset className="mt-1 grow">
          <label className="">
            <input
              className="mb-2 w-full border-b border-outline-variant bg-transparent px-2 py-1.5 text-body-large outline-none"
              type="email"
              placeholder="Enter your E-Mail"
            />
          </label>
          <CheckBox
            id="subscribe-mail"
            onChange={(e) => setAgreed(e.currentTarget.checked)}
            checked={agreed}
            text="I agree with stuff"
          />
        </fieldset>
        <Button className="min-h-12 min-w-48" type="submit">
          Subscribe
        </Button>
      </form>
    </section>
  );
}
