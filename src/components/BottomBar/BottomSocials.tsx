import buyPlaceholder from '../../assets/img/visa.svg';
import ButtonOutlined from '../ButtonOutlined';
import TwitterIcon from '../icons/TwitterIcon';

export default function BottomSocials() {
  return (
    <section className="w-full md:w-auto">
      <h2 className="mb-2.5 text-title-medium antialiased">Contacts</h2>
      <div className="mb-4">
        <div className="mb-1">
          <a className="text-base-large mr-2.5 hover:underline" href="tel:">
            8 880 555 35 35
          </a>
          <span className="text-label-large ">7:00 – 22:00 МСК</span>
        </div>
        <a className="text-base-large hover:underline" href="mailto:">
          support@drilldrip.com
        </a>
      </div>
      <div className="mb-4">
        <ul className="flex gap-2.5">
          <SocialMedia />
          <SocialMedia />
          <SocialMedia />
          <SocialMedia />
        </ul>
      </div>
      <div>
        <ul className="flex gap-2">
          <PaymentItem />
          <PaymentItem />
          <PaymentItem />
        </ul>
      </div>
    </section>
  );
}

function SocialMedia() {
  return (
    <li className="h-10 w-10">
      <ButtonOutlined
        className="rounded-button"
        rippleClassName="rounded-button"
      >
        <TwitterIcon className="h-full w-full stroke-inverse-on-surface" />
      </ButtonOutlined>
    </li>
  );
}

function PaymentItem() {
  return (
    <li>
      <ButtonOutlined
        className="rounded-button"
        rippleClassName="rounded-button"
      >
        <img src={buyPlaceholder} alt="Social Media" />
      </ButtonOutlined>
    </li>
  );
}
