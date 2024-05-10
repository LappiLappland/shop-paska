import placeholder from '../assets/img/nothing.png';

export default function BrandImage() {
  return (
    <article className="pointer-events-none">
      <picture className="">
        <img src={placeholder} alt="" />
      </picture>
    </article>
  );
}
