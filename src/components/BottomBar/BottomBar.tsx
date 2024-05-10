import BottomDesc from './BottomDesc';
import BottomLinksList from './BottomLinksList';
import BottomSocials from './BottomSocials';
import BottomSubscribe from './BottomSubscribe';

const linksCompany = [
  {
    text: 'Vacancies',
    href: '',
  },
  {
    text: 'Abous us',
    href: '',
  },
  {
    text: 'Investors',
    href: '',
  },
  {
    text: 'For partners',
    href: '',
  },
  {
    text: 'Contacts',
    href: '',
  },
];

const linksService = [
  {
    text: 'Shops',
    href: '',
  },
  {
    text: 'Return conditions',
    href: '',
  },
  {
    text: 'Services',
    href: '',
  },
  {
    text: 'Feedback',
    href: '',
  },
  {
    text: 'Privacy policy',
    href: '',
  },
];

const linksOnline = [
  {
    text: 'Delivery',
    href: '',
  },
  {
    text: 'Payment',
    href: '',
  },
  {
    text: 'Sizes chart',
    href: '',
  },
  {
    text: 'Return',
    href: '',
  },
  {
    text: 'Order tracking',
    href: '',
  },
];

export default function BottomBar() {
  return (
    <footer className="bg-inverse-surface px-11 pb-4 pt-6 text-inverse-on-surface">
      <div className="flex flex-row flex-wrap justify-between">
        <BottomDesc />
        <BottomLinksList title="Service" links={linksService} />
        <BottomLinksList title="Company" links={linksCompany} />
        <BottomLinksList title="Online" links={linksOnline} />
        <BottomSocials />
      </div>
      <div className="mb-4 flex justify-center">
        <BottomSubscribe />
      </div>
      <span className="pt-3 flex justify-center border-t border-t-outline-variant">
        Copyright © 2024 DrillDrip. All rights reserved.
      </span>
    </footer>
  );
}
