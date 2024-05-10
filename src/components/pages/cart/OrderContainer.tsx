import { useNavigate } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import AnimatedNumbers from '../../../components/animatedNumbers';
import formatNumber from '../../../helpers/formatNumber';
import Button from '../../Button';

const enum PromoError {
  'none' = 0,
  'success' = 1,
  'failure' = 2,
}

const errorDelay = 5000;

interface OrderContainerProps {
  discountedPrice: number;
  fullPrice: number;
  productsAmount: number;
}

export default function OrderContainer({
  discountedPrice,
  fullPrice,
  productsAmount,
}: OrderContainerProps) {
  const navigate = useNavigate();

  const [showError, setShowError] = useState<PromoError>(0);

  const errorTimer = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    clearTimeout(errorTimer.current);
    if (showError !== 0) {
      errorTimer.current = setTimeout(() => setShowError(0), errorDelay);
    }
    return () => {
      clearTimeout(errorTimer.current);
    };
  }, [showError]);

  return (
    <form className="mb-8 flex h-min w-80 flex-col items-center bg-surface-container-highest px-7 py-4 shadow-level-1 lg:mb-3">
      <ul className="mb-3 w-full border-b py-2">
        <li className="mb-2 flex justify-between">
          <span>
            Products ({productsAmount}
            ):
          </span>
          <AnimatedNumbers
            value={fullPrice}
            numberCallaback={formatNumber}
            extraText=" P"
          />
        </li>
        {discountedPrice === fullPrice ? (
          ''
        ) : (
          <li className="mb-2 flex justify-between">
            <span>Discount:</span>
            <AnimatedNumbers
              value={fullPrice - discountedPrice}
              numberCallaback={formatNumber}
              extraText=" P"
              beforeText="- "
            />
          </li>
        )}
      </ul>
      <div className="mb-2 flex w-full justify-between text-lg font-bold">
        <span>Total:</span>
        <AnimatedNumbers
          value={discountedPrice}
          numberCallaback={formatNumber}
          extraText=" P"
        />
      </div>
      <Button
        className="mt-2 w-full text-title-medium"
        onClick={() => navigate({ to: '/order/delivery' })}
      >
        Make an order
      </Button>
    </form>
  );
}
