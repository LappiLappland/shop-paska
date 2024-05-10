import { useState } from 'react';
import { Sex } from '../../../gql/graphql';
import ButtonToggle from '../../ButtonToggle';
import FiltersIcon from '../../icons/FiltersIcon';
import FiltersModal from './filtersModal';

interface FiltersButtonProps {
  path: string;
  sex: Sex;
}

export default function FiltersButton({ path, sex }: FiltersButtonProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ButtonToggle active={showModal} onClick={() => setShowModal(true)}>
        <FiltersIcon className="h-6 w-12" />
      </ButtonToggle>
      <FiltersModal
        isOpened={showModal}
        onClosedWindow={() => setShowModal(false)}
        sex={sex}
        path={path}
      />
    </>
  );
}
