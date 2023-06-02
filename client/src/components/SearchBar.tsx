import SearchIcon from "@icons/search.svg";

function SearchBar() {
  return (
    <div className="relative col-start-1 col-end-3 flex h-10 w-full max-w-xl">
      <span className="absolute left-3 top-1/2 w-6 -translate-y-1/2 text-gray-400">
        <SearchIcon />
      </span>
      <input
        className="w-full rounded-l-md border border-r-0 border-primary py-2 pl-12 pr-3 focus:outline-none"
        id="search"
        name="search"
        placeholder="Search here..."
        type="text"
      />
      <button className="rounded-r-md border border-primary bg-primary px-8 text-white transition hover:bg-transparent hover:text-primary">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
