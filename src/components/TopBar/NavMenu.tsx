import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Sex } from '../../gql/graphql';
import femaleCategories from '../../mocks/data/femaleCategories.json';
import maleCategories from '../../mocks/data/maleCategories.json';
import ButtonOutlined from '../ButtonOutlined';
import ButtonText from '../ButtonText';
import ButtonToggle from '../ButtonToggle';
import ArrowIcon from '../icons/ArrowIcon';

interface NavMenuProps {
  closeWindow: () => void;
}

export default function NavMenu({ closeWindow }: NavMenuProps) {
  const [currentSex, setCurrentSex] = useState<Sex>(Sex.M);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();

  const usedCategories = currentSex === Sex.M ? maleCategories : femaleCategories;

  const listEl = usedCategories.map((e, i) => {
    return (
      <li className="group" key={e.title}>
        <ButtonOutlined
          className="w-full border-l-0 border-r-0 border-t-0 py-6 text-headline-small group-first:border-t"
          onClick={() => {
            setCurrentCategory(i);
            setShowCategories(true);
          }}
        >
          <div className="flex w-full items-center justify-between px-12">
            <span>{e.title}</span>
            <ArrowIcon direction="right" />
          </div>
        </ButtonOutlined>
      </li>
    );
  });

  const listCatEl = usedCategories[currentCategory].items.map((e) => {
    return (
      <li className="group" key={e}>
        <ButtonOutlined
          className="w-full border-l-0 border-r-0 border-t-0 py-6 text-headline-small group-first:border-t"
          onClick={() => {
            navigate({
              to:
                '/catalog/' +
                (currentSex === Sex.M ? 'menswear/' : 'womenswear/') +
                usedCategories[currentCategory].title +
                '/' +
                (e === 'Check all' ? '' : e),
            });
            closeWindow();
          }}
        >
          {e}
        </ButtonOutlined>
      </li>
    );
  });

  return (
    <div className="py-7">
      <div className="mb-6 flex w-full justify-center gap-3">
        <ButtonToggle
          className="px-3 py-1 text-title-large"
          onClick={() => {
            setCurrentSex(Sex.M);
            setShowCategories(false);
          }}
          active={currentSex === Sex.M}
        >
          Menswear
        </ButtonToggle>
        <ButtonToggle
          className="px-3 py-1 text-title-large"
          onClick={() => {
            setCurrentSex(Sex.F);
            setShowCategories(false);
          }}
          active={currentSex === Sex.F}
        >
          Womenswear
        </ButtonToggle>
      </div>
      <div
        className={`
        flex w-full duration-200
        ease-standart-acclerate
        ${!showCategories ? '' : '-translate-x-full'}
      `}
      >
        <div className="mt-6 w-full shrink-0">
          <ul
            className={`
          ${!showCategories ? 'pointer-events-auto' : 'pointer-events-none'}
          `}
          >
            {listEl}
          </ul>
        </div>
        <div className="w-full shrink-0">
          <ButtonText
            className="mb-3 ml-3 rounded-button text-title-medium"
            rippleClassName="rounded-button"
            color="secondary"
            onClick={() => setShowCategories(false)}
          >
            <ArrowIcon direction="left" />
            <span className="ml-2">Back</span>
          </ButtonText>
          <ul
            className={`
          ${showCategories ? 'pointer-events-auto' : 'pointer-events-none'}
          `}
          >
            {listCatEl}
          </ul>
        </div>
      </div>
    </div>
  );
}
