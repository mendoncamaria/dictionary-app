import { FaSearch } from 'react-icons/fa';

function Search({
  setSearchWord,
  getMeaning,
}: {
  setSearchWord: (word: string) => void;
  getMeaning: () => void;
}) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      getMeaning();
    }
  };

  return (
    <div className="searchBox">
      <input
        type="text"
        placeholder="Find your word..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchWord(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={() => {
          getMeaning();
        }}
      >
        <FaSearch size="22px" />
      </button>
    </div>
  );
}

export default Search;
