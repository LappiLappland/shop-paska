import { useState } from 'react';
import InformationIcon from '../../../../components/icons/InformationIcon';
import Button from '../../../Button';
import ButtonText from '../../../ButtonText';
import FormInputText from '../../../forms/InputText';
import SearchIcon from '../../../icons/SearchIcon';

export default function PickupDelivery() {
  const [search, setSearch] = useState('');

  return (
    <div className="flex flex-col border-t py-2 pl-8 pr-2">
      <h2 className="mb-0.5 text-headline-medium font-bold text-on-surface">
        Self-delivery from pick-up point
      </h2>
      <span className="mb-4 text-title-small text-on-surface-variant">
        Select closest pick-up point
      </span>
      <div className="flex flex-col gap-3">
        <FormInputText
          className="mb-2"
          label="Search"
          id="searchSpot"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          iconLeft={<SearchIcon className="h-4 w-4" />}
        />
        <ul className="max-h-[600px] overflow-y-auto px-2">
          <PickupItem />
          <PickupItem />
          <PickupItem />
          <PickupItem />
          <PickupItem />
          <PickupItem />
          <PickupItem />
          <PickupItem />
          <PickupItem />
        </ul>
      </div>
    </div>
  );
}

function PickupItem() {
  return (
    <li className="flex flex-col border-t border-outline-variant py-2 last:border-b">
      <h2 className="text-lg text-title-large font-semibold text-on-surface">
        Delivery spot name
      </h2>
      <p className="mb-4 text-title-medium text-on-surface-variant">
        More descriptive address
      </p>
      <span className="mb-3 text-title-small text-on-surface">
        <span className="after:mx-2 after:content-['•']">Free</span>
        <span>06 March 2024, Wednesday</span>
      </span>
      <div className="flex justify-between">
        <Button className="mr-5 grow" type="button">
          Pick up here
        </Button>
        <ButtonText className="rounded-button" rippleClassName="rounded-button">
          <InformationIcon className="mr-1.5 h-6 w-6" />
          Read more
        </ButtonText>
      </div>
    </li>
  );
}
