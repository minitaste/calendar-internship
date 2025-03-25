import { useState } from "react";

type Props = {
  onSearch: (query: string) => void;
};

const Search = ({ onSearch }: Props) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="mb-4 flex-1">
      <input
        type="text"
        placeholder="Search todos..."
        value={query}
        onChange={handleSearch}
        className="w-full px-3 py-2 border rounded-md outline-none focus:border-indigo-500"
      />
    </div>
  );
};

export default Search;
