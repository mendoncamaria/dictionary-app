import { useState, type JSX } from 'react';
import Axios from 'axios';
import './App.css';
import { IoVolumeHighOutline } from 'react-icons/io5';
import Search from './components/Search';
import { STRINGS } from './utils/StringConstants';
import { playAudio } from './utils/Utility';
import type { DictionaryData } from './types/DictionaryTypes';

function App(): JSX.Element {
  const [data, setData] = useState<DictionaryData | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [searchWord, setSearchWord] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);

  function getMeaning(): void {
    setLoading(true);
    Axios.get<DictionaryData[]>(
      `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`
    )
      .then((response) => {
        setLoading(false);
        if (response.data && response.data.length > 0) {
          setData(response.data[0]);
        } else {
          setErrorMessage(STRINGS.ERROR_MESSAGE);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(STRINGS.ERROR_CONSOLE, error);
        setIsError(true);
        setErrorMessage(error.message ?? STRINGS.ERROR_MESSAGE);
        setData(null);
      });
  }


  return (
    <div className="App">
      <div className="card">
        <h1>{STRINGS.HEADER_TEXT}</h1>
        <Search setSearchWord={setSearchWord} getMeaning={getMeaning} isLoading={isLoading} />
        {data ? (
          <div className="showResults">
            <div className="main-word">
              {data.word}
              {data.phonetics.some((p) => p.audio) && (
                <button
                  onClick={playAudio.bind(null, data)}
                  aria-label={`Listen to pronunciation of ${data.word}`}
                >
                  <IoVolumeHighOutline size="28px" color="#708A9E" />
                </button>
              )}
              {data.meanings.length > 0 && (
                <span className="part-of-speech-tag">
                  {data.meanings[0].partOfSpeech}
                </span>
              )}
            </div>

            {/* Phonetic Text */}
            {data.phonetics.length > 0 &&
              data.phonetics.find((p) => p.text) && (
                <p className="phonetics">
                  {data.phonetics.find((p) => p.text)?.text}
                </p>
              )}

            {/* Meanings Loop */}
            {data.meanings.map((meaning, meaningIndex) => (
              <div key={meaningIndex}>
                {meaningIndex > 0 && (
                  <h4 className="section-heading">{meaning.partOfSpeech}</h4>
                )}

                {meaning.definitions.map((def, defIndex) => (
                  <div key={defIndex} className="definition-block">
                    <h4 className="section-heading">
                      {STRINGS.DEFINITION} {def.length === 1 ? null : defIndex + 1}:
                    </h4>
                    <p>{def.definition}</p>

                    {def.example && (
                      <>
                        <h4 className="section-heading">{STRINGS.EXAMPLE}</h4>
                        <p className="example-text">
                          <i>"{def.example}"</i>
                        </p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="showResults">
            <h3
              className="error-message"
              style={{ textAlign: 'center', marginTop: '50px' }}
            >
              {errorMessage}
            </h3>
          </div>
        ) : (
          <div className="showResults">
            <h4
              className="section-heading"
              style={{ textAlign: 'center', marginTop: '50px' }}
            >
              {STRINGS.START_SEARCHING}
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
