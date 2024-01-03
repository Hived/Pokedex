import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Card } from "./Card.jsx";
import { Search } from "./Search.jsx";
import { Modal } from "./Modal";

function App() {

  const [pokemonList, setPokemonList] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=40&offset=0')
  const [filter, setFilter] = useState("");
  const [dialogModal, setDialogModal] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedPokemonBackgroundType, setSelectedPokemonBackgroundType] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const getFilteredItems = (filter, items) => {
    if(!filter){
      return items;
    }
    return items.filter((pokemon) => pokemon.name.includes(filter));
  }

  const filteredPokemonList = getFilteredItems(filter,pokemonList)

  async function fetchData() {

    if (isButtonDisabled) {
      return;
    }
    setIsButtonDisabled(true);

    const {data: { results , next}} = await axios.get(loadMore);
    setLoadMore(next)
    await moreDetailsData(results);

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 3000); // Enable the button after 3 seconds
  }


  async function moreDetailsData(results) {
    const details = await Promise.all(
      results.map(async (pokemon) => {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        return data;
      })
    );
    await setPokemonList(currentList => [...currentList, ...details]);
  }
  useEffect(() => {
    fetchData();

    setDialogModal(document.querySelector("dialog"))
    console.log("dialogModal");
    console.log(dialogModal);
  }, []);


  const onCardClick = (pokemon,pokemonBackgroundType) => {
    setSelectedPokemon(pokemon);
    setSelectedPokemonBackgroundType(pokemonBackgroundType)
     console.log("onCardClick");
     console.log(pokemon);
     console.log(dialogModal);
    setDialogModal(document.querySelector("dialog"))
    setTimeout(() => {
      dialogModal.showModal();
    }, 100);
     console.log("End onCardClick");
  };


  useEffect(() => {
    if (pokemonList.length > 0 && !isDataLoaded) {
      setIsDataLoaded(true);
      console.log(pokemonList);
    console.log(loadMore);
    }
  }, [pokemonList, isDataLoaded]);

  return (
    <div className="app-contaner">
      <h1 className="title-pokedex">Pokédex</h1>

      <Modal dialogModal={dialogModal} setDialogModal={setDialogModal} selectedPokemon={selectedPokemon} selectedPokemonBackgroundType={selectedPokemonBackgroundType}/>

      <Search search={(e) => {setFilter(e.target.value);}}></Search>
      <div className="pokemon-container">
        <div className="all-container">

             
        <Card pokemon={filteredPokemonList} onCardClick={onCardClick} />
          
        </div>
          {filter.length === 0 && (
            <button className={`load-more ${isButtonDisabled ? 'disabled' : ''}`} onClick={() => fetchData()} disabled={isButtonDisabled}>Load more</button>
          )}
      </div>
    </div>

  );
}
export default App;
