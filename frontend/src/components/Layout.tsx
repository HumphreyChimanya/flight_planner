import { PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
}>;

export const Layout = ({ children, title, subtitle }: LayoutProps) => (
  <div className="min-h-screen bg-slate-950 text-slate-50">
    <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {subtitle ? (
            <p className="text-sm text-slate-400">{subtitle}</p>
          ) : null}
        </div>
        <a
          href="https://fastapi.tiangolo.com/"
          target="_blank"
          rel="noreferrer"
          className="text-xs uppercase tracking-wide text-emerald-300"
        >
          FastAPI backend · React UI
        </a>
      </div>
    </header>
    <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
  </div>
);

