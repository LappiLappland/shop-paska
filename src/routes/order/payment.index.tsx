import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import BreadCrumbs from '../../components/BreadCrumbs';
import CardIcon from '../../components/icons/CardIcon';
import TruckIcon from '../../components/icons/TruckIcon';
import MethodBlock from '../../components/pages/order/MethodBlock';

export const Route = createFileRoute('/order/payment/')({
  component: PaymentComponent,
});

const enum PaymentMethod {
  'None' = 0,
  'Delivery' = 1,
  'Card' = 2,
}

function PaymentComponent() {
  const [selectedMethod, setSelectedMethod] = useState(PaymentMethod.None);

  const navigate = useNavigate();

  useEffect(() => {
    switch (selectedMethod) {
      case PaymentMethod.None:
        return;
      default:
        navigate({to: '/order/confirmation'},)
    }
  }, [selectedMethod])

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
        current={2}
      />
      <div className="mb-8 min-w-[35%]">
        <div className="flex flex-col border-t px-8 pt-2">
          <h2 className="mb-0.5 text-headline-medium font-bold text-on-surface">
            Method of payment
          </h2>
          <span className="mb-4 text-title-small text-on-surface-variant">
            Select how you want to pay
          </span>
          <MethodBlock
            icon={<TruckIcon className="h-full w-full" />}
            text="Once delivered"
            selected={selectedMethod === PaymentMethod.Delivery}
            onClick={() => setSelectedMethod(PaymentMethod.Delivery)}
          />
          <MethodBlock
            icon={<CardIcon className="h-full w-full" />}
            text="Online by card"
            selected={selectedMethod === PaymentMethod.Card}
            onClick={() => setSelectedMethod(PaymentMethod.Card)}
          />
        </div>
      </div>
    </div>
  );
}
