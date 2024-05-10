interface BottomLinksListProps {
  title: string;
  links: {
    text: string;
    href: string;
  }[];
}

export default function BottomLinksList({
  title,
  links,
}: BottomLinksListProps) {
  const itemsEl = links.map((e, i) => {
    return (
      <li className="mb-1.5" key={i}>
        <a
          className="text-body-medium text-inverse-on-surface hover:underline"
          href={e.href}
        >
          {e.text}
        </a>
      </li>
    );
  });

  return (
    <section className="mb-6">
      <h2 className="mb-2 text-title-medium antialiased">{title}</h2>
      <ul>{itemsEl}</ul>
    </section>
  );
}
