import { Link } from '@tanstack/react-router';
import resetScroll from '../../../helpers/resetScroll';
import ButtonOutlined from '../../ButtonOutlined';
import ButtonToggle from '../../ButtonToggle';
import ArrowIcon from '../../icons/ArrowIcon';

interface PageSelectProps {
  currentPage: number;
  numberOfPages: number;
}

const displayMax = 2;

export default function PageSelect({
  currentPage,
  numberOfPages,
}: PageSelectProps) {
  const from = Math.max(0, currentPage - displayMax);
  const to = Math.min(numberOfPages, currentPage + displayMax - 1);

  const linksEl = Array(to - from)
    .fill(0)
    .map((e, i) => {
      const cur = from + i + 1;
      return (
        <li key={i}>
          <Link
            search={(prev) => {
              return { ...prev, page: cur };
            }}
            onClick={resetScroll}
          >
            <ButtonToggle
              className="h-8 w-8 rounded-md text-title-medium text-primary"
              active={currentPage === cur}
            >
              {cur}
            </ButtonToggle>
          </Link>
        </li>
      );
    });

  return (
    <div className="flex items-center justify-center text-lg">
      <Link
        className="mx-1 h-8 w-8"
        resetScroll
        disabled={currentPage === 1}
        search={(prev) => {
          return { ...prev, page: currentPage - 1 };
        }}
        onClick={() => {
          if (currentPage !== 1) resetScroll();
        }}
      >
        <ButtonOutlined
          className="flex h-8 w-8 items-center justify-center rounded-md"
          addPadding={false}
          disabled={currentPage === 1}
        >
          <ArrowIcon direction="left" />
        </ButtonOutlined>
      </Link>
      {from === 0 ? (
        ''
      ) : (
        <>
          <Link
            search={(prev) => {
              return { ...prev, page: 1 };
            }}
            onClick={resetScroll}
          >
            <ButtonToggle className="h-8 w-8 rounded-md text-title-medium text-primary">
              {1}
            </ButtonToggle>
          </Link>
          <span className="mx-1 flex h-8 w-8 cursor-default items-end justify-center text-on-surface-variant">
            …
          </span>
        </>
      )}
      <ul className="flex gap-1">{linksEl}</ul>
      {to === numberOfPages ? (
        ''
      ) : (
        <>
          <span className="mx-1 flex h-8 w-8 cursor-default items-end justify-center text-on-surface-variant">
            …
          </span>
          <Link
            search={(prev) => {
              return { ...prev, page: numberOfPages };
            }}
            onClick={resetScroll}
          >
            <ButtonToggle className="h-8 w-8 rounded-md text-title-medium text-primary">
              {numberOfPages}
            </ButtonToggle>
          </Link>
        </>
      )}
      <Link
        className="mx-1 h-8 w-8"
        resetScroll
        disabled={currentPage === numberOfPages}
        search={(prev) => {
          return { ...prev, page: currentPage + 1 };
        }}
        onClick={() => {
          if (currentPage !== numberOfPages) resetScroll();
        }}
      >
        <ButtonOutlined
          className="flex h-8 w-8 items-center justify-center rounded-md"
          addPadding={false}
          disabled={currentPage === numberOfPages}
        >
          <ArrowIcon direction="right" />
        </ButtonOutlined>
      </Link>
    </div>
  );
}
