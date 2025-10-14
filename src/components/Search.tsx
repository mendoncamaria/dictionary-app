import { FaSearch } from "react-icons/fa";

function Search({ setSearchWord, getMeaning }: { setSearchWord: (word: string) => void; getMeaning: () => void }) {
  return (
    <div className="searchBox">
      {/* Taking user input */}
      <input
        type="text"
        placeholder="Search..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          // Specify event type
          setSearchWord(e.target.value);
        }}
      />
      <button
        onClick={() => {
          getMeaning();
        }}
      >
        <FaSearch size="20px" />
      </button>
    </div>
  );
}

export default Search;
