interface LoaderProps {
  className?: string;
}

export default function Loader({ className }: LoaderProps) {
  return (
    <span
      className={
        'inline-block animate-spin rounded-full border-4 border-white border-b-transparent ' +
        className
      }
    />
  );
}
