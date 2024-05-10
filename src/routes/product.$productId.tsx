import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import request from 'graphql-request';
import BreadCrumbs, { BreadCrumbsLink } from '../components/BreadCrumbs';
import MainInfo from '../components/pages/product/MainInfo';
import SimilarProducts from '../components/pages/product/SimilarProducts';
import ProductReviews from '../components/pages/product/reviews/GoodsReviews';
import useTitle from '../hooks/useTitle';
import getProductInfoShortQuery from '../queries/GetProductShort';
import getProductInfoQuery from '../queries/getProductInfo';

export const Route = createFileRoute('/product/$productId')({
  component: ProductComponent,
});

function ProductComponent() {
  const { productId } = Route.useParams();

  const { data: dataShort } = useQuery({
    queryKey: ['product', 'short', productId],
    queryFn: async () =>
      request('http://localhost:8080/', getProductInfoShortQuery, { id: productId }),
  });

  const { data: dataFull, isFetching: isFetchingFull } = useQuery({
    queryKey: ['product', 'main', productId],
    queryFn: async () =>
      request('http://localhost:8080/', getProductInfoQuery, { id: productId }),
  });

  useTitle(dataFull?.productMainInfo.name || dataShort?.productMainInfo.name);

  const paths: BreadCrumbsLink[] = dataFull?.productMainInfo
    ? [
        {
          name: dataFull.productMainInfo.sex === 'F' ? 'Womenswear' : 'menswear',
          to: dataFull.productMainInfo.sex === 'F' ? 'womenswear' : 'menswear',
        },
        ...dataFull.productMainInfo.category.split('/').map((e) => {
          return { name: e, to: e };
        }),
        {
          name: dataShort?.productMainInfo.name ?? '',
          to: '/product/' + productId,
          ignorePrevious: true,
        }
      ]
    : [{ name: '', to: '' }];

  if (!isFetchingFull && !dataFull?.productMainInfo) {
    return (
      <div className="flex h-72 w-full flex-col items-center justify-center">
        <span className="text-display-large text-on-surface">404</span>
        <span className="text-display-small text-on-surface">
          This product does not exist!
        </span>
      </div>
    );
  }
  

  return (
    <>
      <BreadCrumbs className="mb-4 mt-3" base="/catalog/" links={paths} />
      <MainInfo productId={productId} />
      <SimilarProducts productId={productId} />
      <ProductReviews productId={productId} />
    </>
  );
}
