import { GetStarted } from './get-started';

export default function Home() {
  return (
    <main>
      <section className="grid place-items-center min-h-[93vh]">
        <div className="max-w-4xl flex flex-col items-center gap-6">
          <h1 className="text-5xl font-black text-center">
            Read with Clarity for Ad-Free Bookmarking and Distraction-Free Reading Pleasure
          </h1>
          <span className="text-center text-secondary dark:text-secondary-dark">
            Effortlessly bookmark articles, say Goodbye to ads, and enjoy your reading
          </span>
          <GetStarted />
        </div>
      </section>
    </main>
  );
}
