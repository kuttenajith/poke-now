import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useLoader } from "../context/LoaderContext";
import Spinner from "../components/LoadingSpinner";

const PokemonDetailPage = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const { addFavorite } = useFavorites();
  const { loading, setLoading } = useLoader();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
          throw new Error("Pokémon not found");
        }
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (name) {
      fetchPokemon();
    }
  }, [name, setLoading]);

  const handleAddToFavorites = () => {
    if (pokemon) {
      addFavorite(pokemon);
      navigate("/favorites");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
      {
        loading ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <Spinner />
          </div>
        ) : ''
      }
      <button onClick={() => navigate(-1)} className="p-2 bg-blue-500 text-white rounded mb-4">
        Back
      </button>
      {pokemon && (
        <div className="p-4 bg-white dark:bg-gray-900 shadow rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-center">
          <h1 className="text-3xl font-bold mb-4">{pokemon.name.toUpperCase()}</h1>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-32 h-32 mx-auto mb-4"
          />
          <ul className="list-none">
            <li>Type(s): {pokemon.types.map((type) => type.type.name).join(", ")}</li>
            <li>Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}</li>
            <li>Height: {pokemon.height}</li>
            <li>Weight: {pokemon.weight}</li>
          </ul>
          <button
            onClick={handleAddToFavorites}
            className="mt-4 p-2 bg-green-500 text-white rounded"
          >
            Add to Favorites
          </button>
        </div>
      )}
    </div>
  );
};

export default PokemonDetailPage;
