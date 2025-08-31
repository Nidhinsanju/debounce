import { useContext } from "react";
import { SearchContext } from "../searchContext/SearchContext";

function Header() {
  const context = useContext(SearchContext);

  if (!context) return null; // safety check
  const { data, setData } = context;

  return (
    <header className="w-full shadow-md bg-amber-50">
      <main className="max-w-6xl mx-auto flex flex-row justify-between items-center px-6 py-4">
        {/* Logo */}
        <span className="text-xl font-bold text-amber-900">Logo</span>
        {/* Search */}
        <div className="flex items-center space-x-2">
          <span className="text-amber-900 font-medium">Search</span>
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 rounded-lg border border-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            onChange={(e) => {
              setData(e.target.value);
            }}
            value={data}
          />
        </div>
      </main>
    </header>
  );
}

export default Header;
