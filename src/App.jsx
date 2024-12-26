import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./components/Favorites";
import PokemonDetailPage from "./pages/PokemonDetailPage";
import { FavoritesProvider } from "./context/FavoritesContext";

const App = () => {
  return (
    <FavoritesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
};

export default App;
