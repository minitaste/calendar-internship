const Header = () => {
  return (
    <nav>
      <div className="bg-slate-800 flex items-center justify-center gap-x-4 text-3xl border-b border-gray-500 drop-shadow fixed top-0 z-30 w-full py-4">
        <a href="/" className="text-teal-500">
          List of todos
        </a>
        <a href="/calendar" className="text-red-400">
          Calendar
        </a>
      </div>
    </nav>
  );
};

export default Header;
