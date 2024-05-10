import { useState } from 'react';
import SizesChartModal from '../../SizesChartModal';

export default function SizesButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="">
      <button
        className="mb-8 text-left text-label-medium underline hover:text-sky-700"
        onClick={() => setShowModal(true)}
      >
        Sizes Chart
      </button>
      <SizesChartModal
        onClosedWindow={() => setShowModal(false)}
        isOpened={showModal}
      />
    </div>
  );
}
