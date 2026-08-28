import Link from "next/link";

export default function LocaleNotFound() {
  return (
    <div className="container-page">
      <div className="card grid place-items-center gap-3 p-16 text-center">
        <h1 className="text-6xl font-black text-brand-800">۴۰۴</h1>
        <p className="text-black/60">
          صفحه‌ای که دنبال آن بودید پیدا نشد. — The page was not found.
        </p>
        <Link
          href="/fa"
          className="rounded-md bg-brand-600 px-5 py-2 font-bold text-white transition hover:bg-brand-700"
        >
          صفحه نخست / Home
        </Link>
      </div>
    </div>
  );
}
