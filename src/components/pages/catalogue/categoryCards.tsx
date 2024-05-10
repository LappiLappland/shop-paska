import CategoryCard from "./categoryCard";

interface CategoryCardsProps {
  sex: 'F' | 'M',
}

export default function CategoryCards({sex}: CategoryCardsProps) {

  if (sex === 'F') {
    return (
      <section className="mb-8 mt-4 flex flex-col gap-6">
        <div className="flex gap-6">
          <CategoryCard
            className="grow"
            text="Tops"
            link={'womenswear/tops'}
          />
          <CategoryCard
            className="grow"
            text="Bottoms"
            link={'womenswear/bottoms'}
          />
          <CategoryCard
            className="hidden grow lg:block"
            text="Outerwear"
            link={'womenswear/outerwear'}
          />
        </div>
        <div className="flex flex-col gap-6 lg:flex-row">
          <CategoryCard
            className="grow"
            direction="row"
            text="Dresses"
            link={'womenswear/dresses'}
          />
          <CategoryCard
            className="grow"
            direction="row"
            text="Accessories"
            link={'womenswear/accessories'}
          />
        </div>
      </section>
    )
  }

  return (
    <section className="mb-8 mt-4 flex flex-col gap-6">
      <div className="flex gap-6">
        <CategoryCard
          className="grow"
          text="Outwear"
          link={'menswear/outwear'}
        />
        <CategoryCard
          className="grow"
          text="Tops"
          link={'menswear/tops'}
        />
        <CategoryCard
          className="hidden grow lg:block"
          text="Bottoms"
          link={'menswear/bottoms'}
        />
      </div>
      <div className="flex flex-col gap-6 lg:flex-row">
        <CategoryCard
          className="grow"
          direction="row"
          text="Footwear"
          link={'menswear/footwear'}
        />
        <CategoryCard
          className="grow"
          direction="row"
          text="Accessories"
          link={'menswear/accessories'}
        />
      </div>
    </section>
  )
}