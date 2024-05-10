import { Link } from '@tanstack/react-router';
import { stringUpperStart } from '../helpers/string';

export interface BreadCrumbsLink {
  name: string;
  to: string;
  ignorePrevious?: boolean;
}

interface BreadCrumbsProps {
  className?: string;
  current?: number;
  base?: string;
  links: BreadCrumbsLink[];
}

export default function BreadCrumbs({
  className = '',
  current = -1,
  base,
  links,
}: BreadCrumbsProps) {
  const linksUse: BreadCrumbsLink[] = !base
    ? links
    : links.reduce((arr, link, i) => {
        return [
          ...arr,
          {
            name: link.name,
            to: !link.ignorePrevious ? ((i === 0 ? base : arr[i - 1].to) + '/' + link.to) : link.to,
          },
        ];
      }, [] as BreadCrumbsLink[]);

  const itemsEl = linksUse.map((e, i) => {
    return (
      <li
        className="mr-2.5 text-label-large text-on-surface-variant after:ml-2.5 after:content-['>'] last:after:content-['']"
        key={i}
      >
        <Link
          className={`hover:underline ${current === i ? 'text-primary underline' : ''}`}
          to={e.to}
        >
          {stringUpperStart(e.name)}
        </Link>
      </li>
    );
  });

  return <ul className={'flex flex-wrap ' + className}>{itemsEl}</ul>;
}
