import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsSun, BsMoon } from "react-icons/bs";
import Spinner from "../components/LoadingSpinner";
import PokemonCard from "../components/PokemonCard";
import Pagination from "../components/Pagination";

const HomePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [paginatedPokemon, setPaginatedPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 12;

  const paginatedData = allPokemon.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();
        setAllPokemon(data.results);
        setPaginatedPokemon(data.results.slice(0, ITEMS_PER_PAGE));
      } catch (err) {
        setError(err.message || "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllPokemon();
  }, []);

  const handleSearchChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);
    if (input) {
      const filteredSuggestions = allPokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(input.toLowerCase())
      );
      if (filteredSuggestions.length === 0) {
        setSuggestions([]);
        setError("No Data Found! Please Retry with correct name or id")
      } else {
        setError('')
      }
      setSuggestions(filteredSuggestions.slice(0, 10));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (name) => {
    setSearchInput("");
    setSuggestions([]);
    navigate(`/pokemon/${name}`);
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`${darkMode ? "bg-gray-800" : "bg-gray-100"} min-h-screen text-black`}>
      <header className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-700 sticky top-0 z-25">
        <h1
          className={`${darkMode ? "text-black" : "text-white"} text-2xl font-bold cursor-pointer`}>PokeNow</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/favorites")}
            className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            Favorites
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 transition"
          >
            {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
          </button>
        </div>
      </header>

      <div className="bg-white dark:bg-gray-900 shadow p-4 sticky top-0 z-20">
        <input
          type="search"
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Search Pokémon by name or ID..."
          className="w-full p-2 border border-gray-300 rounded-lg dark:border-gray-600"
        />
        {suggestions.length > 0 && (
          <ul className={`${darkMode ? "bg-white border rounded-lg shadow-lg"
            : "dark:bg-gray-900 text-white rounded-lg shadow-lg"}`}>
            {suggestions.map((pokemon, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(pokemon.name)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
              >
                {pokemon.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Spinner />
        </div>
      ) : error ? (
        <div className="text-center text-red-600 mt-4">
          <p>{error}</p>
        </div>
      ) : (
        <div className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {paginatedData.map((pokemon, index) => (
              <PokemonCard key={index} name={pokemon.name} url={pokemon.url} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(allPokemon.length / ITEMS_PER_PAGE)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
