import description from '../../mocks/data/lorem.json';

export default function BottomDesc() {
  return (
    <section className="mb-6 w-full min-w-72 lg:w-1/4">
      <h2 className="mb-2.5 text-title-large font-bold antialiased">
        DrillDrip
      </h2>
      <p className="text-body-large antialiased">{description.slice(0, 300)}</p>
    </section>
  );
}
