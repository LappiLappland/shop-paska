import { Link } from '@tanstack/react-router';

export default function NavDesktop() {
  return (
    <div className="mr-6 text-lg text-on-surface">
      <Link
        className="mr-4 hover:underline"
        to="/catalog"
        search={{ sex: 'menswear' }}
        activeProps={() => {
          return {
            className: 'underline',
          }
        }}
      >
        Menswear
      </Link>
      <Link
        className="mr-4 hover:underline"
        to="/catalog"
        search={{ sex: 'womenswear' }}
        activeProps={() => {
          return {
            className: 'underline',
          }
        }}
      >
        Womenswear
      </Link>
    </div>
  );
}
