
import Link from 'next/link';
import Search from './Search';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Blog Demo
        </Link>
        <Search />
      </div>
    </header>
  );
}
