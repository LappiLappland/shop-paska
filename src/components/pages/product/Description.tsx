interface ProductDescriptionProps {
  description: string;
}

export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  return (
    <section className="mb-5">
      <h1 className="mb-2.5 text-4xl">Description</h1>
      <p>{description}</p>
    </section>
  );
}
