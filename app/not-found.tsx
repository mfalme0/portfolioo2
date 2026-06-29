import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">
      <div className="max-w-lg text-center">
        <span className="apple-eyebrow-accent text-sm">404</span>
        <h1 className="apple-heading mt-4 mb-6">Page not found</h1>
        <p className="apple-subtitle mb-10 mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-semibold tracking-[0.01em] transition-all duration-300 hover:opacity-85"
          style={{ backgroundColor: 'var(--color-accent)', color: '#ffffff' }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
