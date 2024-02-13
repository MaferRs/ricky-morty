import { useEffect, useState } from 'react';
import { CardCharacter } from '../CardCharacter/inde';
import { ContainerApp, ContentCharacters, HeaderApp, Loader } from './styles';
import IconLoader from '../../assets/loader.gif';

import axios from 'axios';

export function Application() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [CountPages, setCountPages] = useState('');
  const [qtdCharacters, setQtdCharacters] = useState('');
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then(response => {
        const array = [...characters, ...response.data.results];
        setCharacters(array);
        setCountPages(response.data.info.pages);
        setQtdCharacters(response.data.info.count);
        setIsLoader(false);
      });
  }, [page]);

  return (
    <>
      {isLoader && (
        <Loader>
          <img src={IconLoader} alt="" />
        </Loader>
      )}

      <ContainerApp>
        <HeaderApp>
          <h1>Ricky and Morty </h1>
          <span>Nº de personagens: {qtdCharacters}</span>
        </HeaderApp>
        <ContentCharacters>
          <div>
            {characters &&
              characters.map(({ image, name, species, genre }, index) => {
                return (
                  <CardCharacter
                    key={index}
                    image={image}
                    name={name}
                    genre={species}
                    specie={genre}
                  />
                );
              })}
          </div>
          {!(page === CountPages) && (
            <button onClick={() => setPage(page + 1)}>Carregar mais</button>
          )}
        </ContentCharacters>
      </ContainerApp>
    </>
  );
}
