import { Link } from '@tanstack/react-router';

export default function NavDesktop() {
  return (
    <div className="mr-6 text-lg text-on-surface">
      <Link
        className="mr-4 hover:underline"
        to="/catalog"
        search={{ sex: 'menswear' }}
      >
        Menswear
      </Link>
      <Link
        className="mr-4 hover:underline"
        to="/catalog"
        search={{ sex: 'womenswear' }}
      >
        Womenswear
      </Link>
    </div>
  );
}
