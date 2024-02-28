import { GetStarted } from './get-started';

export default function Home() {
  return (
    <section className="grid place-items-center h-[94vh]">
      <div className="max-w-4xl flex flex-col items-center gap-6">
        <h1 className="text-6xl font-bold text-center leading-[4.5rem]">
          Enjoy Distraction-Free Reading and Bookmark Your Articles with Ease
        </h1>
        <span className="text-center text-accent dark:text-secondary-dark">
          Effortlessly bookmark articles, say Goodbye to ads, and enjoy your reading
        </span>
        <GetStarted />
      </div>
    </section>
  );
}
