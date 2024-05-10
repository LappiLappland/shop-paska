import imageResolve from '../../../helpers/imageResolve';
import LinkImage from '../../LinkImage';
import SliderBig from '../../sliderBig/SliderBig';

const placeholder = 'img/main-image-2';
const placeholder2 = 'img/main-image-3';
const placeholder3 = 'img/main-image-1';
const placeholderRight = 'img/main-image-men';

export default function Meet() {
  return (
    <section className="mb-8 w-full grid-cols-[auto_minmax(20%,500px)] gap-1 lg:grid">
      <div className="mb-1 h-[550px]">
        <SliderBig sliderSwitchTime={10000}>
          <picture
            className='h-full w-full'
          >
            <source srcSet={imageResolve(placeholder, 'webp')} type="image/webp" />
            <img
              className='object-cover h-full w-full'
              src={imageResolve(placeholder)}
              alt=""
            />
          </picture>
          <picture
            className='h-full w-full'
          >
            <source srcSet={imageResolve(placeholder2, 'webp')} type="image/webp" />
            <img
              className='object-cover h-full w-full'
              src={imageResolve(placeholder2)}
              alt=""
            />
          </picture>
          <picture
            className='h-full w-full'
          >
            <source srcSet={imageResolve(placeholder3, 'webp')} type="image/webp" />
            <img
              className='object-cover h-full w-full'
              src={imageResolve(placeholder3)}
              alt=""
            />
          </picture>
        </SliderBig>
      </div>
      <div className="flex h-auto gap-1 pb-1 lg:h-[550px] lg:flex-col">
        <LinkImage img={placeholderRight} text="Menswear" sex="menswear" />
        <LinkImage img={placeholderRight} text="Womenswear" sex="womenswear" />
      </div>
    </section>
  );
}
