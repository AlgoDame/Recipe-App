import React, { useEffect, useState } from 'react';
import Recipe from './recipes';
import './App.css';

function App() {
  const appID = "7dd87bc3";
  const appKeys = "dcd1aaf409c964a1a4462ec87e112592";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");


  useEffect(() => {
    getRecipes();
  }, [query]);
  
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${appID}&app_key=${appKeys}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
    
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }
  
  return (
    <div className="App">
      <form className="search-form" onSubmit={ getSearch}>
        <input className="search-bar" type="text" value={search} onChange={ updateSearch}/>
        <button className="search-button" type="submit" >Search</button>
      </form>
      <div className="recipes">

      {recipes.map(recipe => (
       
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={ recipe.recipe.ingredients}/>
     ))}
      </div>
    </div>
  )
}

export default App;
