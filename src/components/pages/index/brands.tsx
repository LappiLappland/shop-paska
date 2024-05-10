import BrandImage from '../../BrandImage';
import SliderLong from '../../sliderLong/SliderLong';

export default function MeetBrands() {
  return (
    <section className="mb-8">
      <h2 className="mb-4 mt-4 text-center text-display-small font-semibold antialiased">
        Our brands
      </h2>
      <div>
        <SliderLong
          showSlides={{
            lg: 6,
            md: 4,
            sm: 2,
          }}
        >
          <BrandImage />
          <BrandImage />
          <BrandImage />
          <BrandImage />
          <BrandImage />
          <BrandImage />
          <BrandImage />
          <BrandImage />
          <BrandImage />
          <BrandImage />
          <BrandImage />
          <BrandImage />
          <BrandImage />
          <BrandImage />
          <BrandImage />
          <BrandImage />
        </SliderLong>
      </div>
    </section>
  );
}
