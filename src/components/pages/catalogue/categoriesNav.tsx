import { Link } from '@tanstack/react-router';
import femaleCategories from '../../../mocks/data/femaleCategories.json';
import maleCategories from '../../../mocks/data/maleCategories.json';
import { ProductCategoryType } from '../../../types/ProductCategory';
import Accordion from '../../Accordion';

interface CategoriesNav {
  sex: 'menswear' | 'womenswear';
}

export default function CategoriesNav({ sex }: CategoriesNav) {

  const categories = sex === 'menswear' ? maleCategories : femaleCategories;

  const itemsEl = categories.map((e) => {
    return (
      <SmallerList sex={sex} items={e.items} title={e.title} key={e.title} />
    );
  });

  return (
    <nav className="">
      <h1 className="mb-3 text-title-large font-bold">Categories</h1>
      <Accordion
        titleClassname="text-title-medium"
        titles={categories.map((e) => e.title)}
      >
        {itemsEl}
      </Accordion>
    </nav>
  );
}

interface SmallerListProps {
  title: string;
  items: ProductCategoryType['items'];
  sex: 'menswear' | 'womenswear';
}

function SmallerList({ title, items, sex }: SmallerListProps) {
  const itemsEl = ['Check all', ...items].map((e) => {
    return (
      <li className="mb-1 pl-4 text-body-large" key={e}>
        <Link
          className="hover:underline"
          to={
            '/catalog/' +
            (sex === 'menswear' ? 'menswear/' : 'womenswear/') +
            title +
            '/' +
            (e === 'Check all' ? '' : e)
          }
        >
          {e}
        </Link>
      </li>
    );
  });

  return <ul className="mb-2">{itemsEl}</ul>;
}
