import { FaSearch } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function Search({
  setSearchWord,
  getMeaning,
  isLoading,
}: {
  setSearchWord: (word: string) => void;
  getMeaning: () => void;
  isLoading: boolean;
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
          setSearchWord(e.target.value.toLowerCase());
        }}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={() => {
          getMeaning();
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <AiOutlineLoading3Quarters className="loading-icon" size="22px" />
        ) : (
          <FaSearch size="22px" />
        )}
      </button>
    </div>
  );
}

export default Search;
