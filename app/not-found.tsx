import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-prose py-24 text-center">
      <div className="mx-auto max-w-md">
        <div className="display-num text-8xl font-bold text-amber">404</div>
        <h1 className="mt-6 font-display text-3xl font-bold text-ink">העמוד לא נמצא</h1>
        <p className="mt-4 text-ink-soft">
          נראה שהלכתם לאיבוד. אולי המחשבון שאתם מחפשים נמצא ברשימה הראשית?
        </p>
        <Link href="/" className="btn-primary mt-8 inline-flex">חזרה לדף הבית</Link>
      </div>
    </div>
  );
}
