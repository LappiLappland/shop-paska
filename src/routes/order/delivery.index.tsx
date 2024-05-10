import { createFileRoute } from '@tanstack/react-router';
import { ReactNode, useState } from 'react';
import BreadCrumbs from '../../components/BreadCrumbs';
import TruckIcon from '../../components/icons/TruckIcon';
import MethodBlock from '../../components/pages/order/MethodBlock';
import CourierDelivery from '../../components/pages/order/delivery/Courier';
import PickupDelivery from '../../components/pages/order/delivery/Pickup';

export const Route = createFileRoute('/order/delivery/')({
  component: DeliveryComponent,
});

const enum ObtainMethod {
  'None' = 0,
  'Courier' = 1,
  'PickUp' = 2,
}

function DeliveryComponent() {
  const [selectedMethod, setSelectedMethod] = useState(ObtainMethod.None);

  let rightElement: ReactNode = '';
  switch (selectedMethod) {
    case ObtainMethod.Courier:
      rightElement = <CourierDelivery />;
      break;
    case ObtainMethod.PickUp:
      rightElement = <PickupDelivery />;
      break;
    default:
      rightElement = (
        <div className="flex min-h-[600px] flex-col border-t px-8 py-2" />
      );
      break;
  }

  return (
    <div className="flex w-full grow flex-col items-center justify-center">
      <BreadCrumbs
        className="py-2.5"
        links={[
          { name: 'Cart', to: '/cart' },
          { name: 'Delivery', to: '/order/delivery' },
          { name: 'Payment', to: '/order/payment' },
          { name: 'Confirmation', to: '/order/confirmation' },
        ]}
        current={1}
      />
      <div className="mb-8 grid grid-cols-2">
        <div className="flex flex-col border-r border-t px-8 pt-2">
          <h2 className="mb-0.5 text-headline-medium font-bold text-on-surface">
            Method of obtaining
          </h2>
          <span className="mb-4 text-title-small text-on-surface-variant">
            Select your location and method of receiving your order
          </span>
          <MethodBlock
            icon={<TruckIcon className="h-full w-full" />}
            text="Courier delivery"
            selected={selectedMethod === ObtainMethod.Courier}
            onClick={() => setSelectedMethod(ObtainMethod.Courier)}
          />
          <MethodBlock
            icon={<TruckIcon className="h-full w-full" />}
            text="Self-delivery from pick-up point"
            selected={selectedMethod === ObtainMethod.PickUp}
            onClick={() => setSelectedMethod(ObtainMethod.PickUp)}
          />
        </div>
        {rightElement}
      </div>
    </div>
  );
}
