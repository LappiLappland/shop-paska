import { Link } from '@tanstack/react-router';
import CloseIcon from '../../../components/icons/CloseIcon';
import formatNumber from '../../../helpers/formatNumber';
import imageResolve from '../../../helpers/imageResolve';
import ButtonText from '../../ButtonText';
import AmountControls from './AmountControls';

interface CartItemProps {
  id: string;
  color: string;
  size: string;
  amount: number;
  image: string;
  brand: string;
  name: string;
  price: number;
  discount: number;
  onAdd: () => void;
  onRemove: () => void;
  onRemoveFull: () => void;
}

export default function CartItem({
  id,
  color,
  size,
  amount,
  image,
  brand,
  name,
  price,
  discount,
  onAdd,
  onRemove,
  onRemoveFull,
}: CartItemProps) {
  return (
    <article
    className="flex h-64 rounded-md border border-outline-variant bg-surface-container-low py-4"
    data-testid="cart-product"
    >
      <Link className="pl-2" to={'/product/' + id}>
        <picture>
          <img src={imageResolve(image)} className="h-full" alt="" />
        </picture>
      </Link>
      <div className="grow px-6">
        <div className="mb-4 flex-col justify-between md:flex-row">
          <Link
            className="group flex flex-col hover:text-primary"
            to={'/product/' + id}
          >
            <span className="text-title-large font-bold group-hover:underline">
              {brand}
            </span>
            <span className="text-title-medium text-on-surface">{name}</span>
          </Link>
          <span>
            {discount ? (
              <>
                <ins className="mr-2.5 text-headline-small font-medium no-underline">
                  {formatNumber(price * (1 - discount)) + ' P'}
                </ins>
                <div>
                  <del className="pr-2 text-title-medium font-medium text-on-surface-variant">
                    {formatNumber(price) + ' P'}
                  </del>
                  <span className="rounded bg-tertiary px-1 py-0.5 text-label-large text-on-tertiary">
                    {'-' + discount * 100 + '%'}
                  </span>
                </div>
              </>
            ) : (
              <span className="text-headline-small font-medium">
                {formatNumber(price) + ' P'}
              </span>
            )}
          </span>
        </div>
        <dl className="mb-4 grid grid-cols-[min-content_1fr] items-center">
          <dt className="mr-6 text-label-large text-on-surface-variant">
            Color:
          </dt>
          <dd>
            <span
              className="block h-4 w-4 rounded-full"
              style={{ backgroundColor: '#' + color }}
            />
          </dd>
          <dt className="text-label-large text-on-surface-variant">Size:</dt>
          <dd className="text-label-large text-on-surface">{size}</dd>
        </dl>
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <AmountControls value={amount} onAdd={onAdd} onRemove={onRemove} />
          <ButtonText
            className="flex items-center rounded-button"
            rippleClassName="rounded-button"
            onClick={onRemoveFull}
          >
            <CloseIcon className="mr-2 h-4 w-4" />
            Remove
          </ButtonText>
        </div>
      </div>
    </article>
  );
}
