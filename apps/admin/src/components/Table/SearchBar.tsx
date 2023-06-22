const SearchBar = ({ query, handleSearchQuery }: { query: string, handleSearchQuery: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <>
            <div className="flex items-center justify-between px-4 py-3 text-xs font-semibold tracking-wider text-gray-500 uppercase bg-white border-b dark:bg-gray-800 dark:text-gray-400">
                <input
                    value={query}
                    onChange={handleSearchQuery}
                    className="block w-full px-4 py-2 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Search..."
                />
            </div>
        </>
    )
}

export default SearchBar