import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import { useMemo, useState } from 'react';
import formatNumber from '../../../helpers/formatNumber';
import { getDiscounted } from '../../../helpers/getDiscounted';
import { pageURL } from '../../../mocks/browser';
import getProductInfoShortQuery from '../../../queries/GetProductShort';
import getProductInfoQuery from '../../../queries/getProductInfo';
import Accordion from '../../Accordion';
import Gallery from '../../Gallery/Gallery';
import AnimatedNumbers from '../../animatedNumbers';
import AddButton from './AddButton';
import ColorSelect from './ColorSelect';
import PropertiesShortList from './PropertiesShortList';
import RatingLine from './RatingLine';
import SizeSelect from './SizeSelect';
import SizesButton from './SizesButton';

interface MainInfoProps {
  productId: string;
}

export default function MainInfo({ productId }: MainInfoProps) {
  const [curColor, setCurColor] = useState('');
  const [curSize, setCurSize] = useState('');


  const { data: dataShort } = useQuery({
    queryKey: ['product', 'short', productId],
    queryFn: async () =>
      request(pageURL, getProductInfoShortQuery, { id: productId }),
  });

  const { data: dataFull } = useQuery({
    queryKey: ['product', 'main', productId],
    queryFn: async () =>
      request(pageURL, getProductInfoQuery, { id: productId }),
  });

  const mappedPrices = useMemo(() => {
    const map: Record<string, { price: number; discount: number }> = {};
    if (dataFull?.productMainInfo) {
      dataFull.productMainInfo.prices.forEach((price) => {
        map[price.colorId + '_' + price.sizeId] = {
          price: price.price,
          discount: price.discount,
        };
      });
    }
    return map;
  }, [dataFull]);

  if (!dataFull?.productMainInfo && !dataShort?.productMainInfo) {
    return <div className="mb-8 min-h-[800px]" />;
  }

  const price =
    mappedPrices[curColor + '_' + curSize]?.price ||
    dataShort?.productMainInfo.price || 0;
  const discount =
    mappedPrices[curColor + '_' + curSize]?.discount ||
    dataShort?.productMainInfo.discount || 0;
  
  return (
    <div className="mb-8 flex min-h-[800px] flex-col justify-center gap-4 lg:flex-row">
      <div className="h-[800px] grow">
        <Gallery images={dataFull?.productMainInfo.gallery || dataShort?.productMainInfo.gallery || []} />
      </div>
      <div className="mt-1 flex shrink-0 basis-1/4 flex-col">
        <RatingLine productId={productId} />
        <h2 className="mb-4">
          <p className="text-headline-large font-bold">
            {dataFull?.productMainInfo.brand || dataShort?.productMainInfo.brand || ''}
          </p>
          <p className="text-headline-small text-on-surface-variant">
            {dataFull?.productMainInfo.name || dataShort?.productMainInfo.name || ''}
          </p>
        </h2>
        <div className="mb-8 flex font-bold">
          <div className="flex flex-col">
            <ins className="mr-2 text-headline-small font-medium no-underline">
              <AnimatedNumbers
                value={price}
                numberCallaback={(n) =>
                  formatNumber(getDiscounted(n, discount))
                }
                extraText=" P"
              />
            </ins>
            {!discount ? (
              ''
            ) : (
              <del className="mr-2 text-title-medium text-on-surface-variant">
                <AnimatedNumbers
                  value={price}
                  numberCallaback={formatNumber}
                  extraText=" P"
                />
              </del>
            )}
          </div>
          {!discount ? (
            ''
          ) : (
            <span className="mt-1.5 h-min rounded bg-tertiary px-1 py-0.5 text-label-large text-on-tertiary">
              {'-' + discount * 100 + '%'}
            </span>
          )}
        </div>
        <ColorSelect
          colors={dataFull?.productMainInfo.colors || [{id: '-', name: '', hex: 'ffffff'}]}
          curColor={curColor}
          setCurColor={(color) => setCurColor(color)}
        />
        <SizeSelect
          sizes={dataFull?.productMainInfo.sizes || dataShort?.productMainInfo.sizes.map(e => {return {...e, type: '', available: true}}) || []}
          curSize={curSize}
          setCurSize={(size) => setCurSize(size)}
        />
        <SizesButton />
        <AddButton productId={productId} size={curSize} color={curColor} />
        <Accordion
          titleClassname="font-medium text-lg"
          titles={['Description', 'Properties']}
        >
          <p className="text-base-medium whitespace-pre-line">
            {dataFull?.productMainInfo.description || ''}
          </p>
          <PropertiesShortList
            className="text-base-medium"
            properties={dataFull?.productMainInfo.properties || []}
          />
        </Accordion>
      </div>
    </div>
  );
}
