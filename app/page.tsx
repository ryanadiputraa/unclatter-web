import Link from 'next/link';

import { Header } from './components/header';
import { SIGN_IN_GOOGLE_URL } from '@/utils/constant';

export default function Home() {
  return (
    <>
      {/* TODO: authenticated */}
      <Header isAuthenticated={true} />
      <main>
        <section className="grid place-items-center min-h-[93vh]">
          <div className="max-w-4xl flex flex-col items-center gap-6">
            <h1 className="text-5xl font-black text-center">
              Read with Clarity for Ad-Free Bookmarking and Distraction-Free Reading Pleasure
            </h1>
            <span className="text-center text-secondary dark:text-secondary-dark">
              Effortlessly bookmark articles, say Goodbye to ads, and enjoy your reading
            </span>
            {/* TODO: authenticated */}
            <Link href={false ? '/article' : SIGN_IN_GOOGLE_URL}>
              <button className="px-4 py-2 border-secondary border-[0.02rem] rounded-lg hover:bg-secondary dark:hover:bg-secondary-dark">
                Get Started
              </button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
