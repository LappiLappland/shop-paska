import { createFileRoute } from '@tanstack/react-router';
import Meet from '../components/pages/index/meet';
import MeetSales from '../components/pages/index/sales';
import MeetPopular from '../components/pages/index/popular';
import MeetBrands from '../components/pages/index/brands';

export const Route = createFileRoute('/')({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <>
      <Meet />
      <MeetSales />
      <MeetPopular />
      <MeetBrands />
    </>
  );
}
