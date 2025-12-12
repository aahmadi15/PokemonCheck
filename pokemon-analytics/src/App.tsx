import { useEffect, useState } from 'react'
import './App.css'
function App() {
  const [pokemon, setPokemon]= useState();
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("")


  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      const res = await fetch(url, {
        method: "GET"
}
      )
      const data = await res.json()
      toArray.push(data);
      setPokemonType(data.types[0].type.name)
      setPokemonData(toArray);
      console.log(res)
    } catch(e){
      console.log(e)
    }
  }


  useEffect(() => {
    getPokemon()
  }, [])

  
  /*const handleOnSubmit = async () => {
   try {
    const response = await fetch(`${initialUrl}/${pokemonData}`);
    const json = await response.json();
    console.log(json)
   } catch (error){
    console.error("Error fetching pokemon:", error);
   }
    };
    */

    const handleVal = (e) => {
      setPokemon(e.target.value.toLowerCase())
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      getPokemon()
    }
  return (
    <div>
      {
    <>
    <div className = "grid-container">
       <form onSubmit={handleSubmit}>
          <label>
            <input type="text" onChange = {handleVal} placeholder="Enter pokedex value"/>
          </label>
        </form>  
        {pokemonData.map((data)=>{
          return(
            <div className='container'>
              <img src = {data.sprites["front_default"]}/>
              <div className = "divTable">
              <div className='divTableBody'> </div>
              <div className='divTableRow'>
                <div className='divTableCell'>Type</div>
                <div className='divTableCell'>{pokemonType}</div>
            </div>
            <div className='divTableRow'>
                <div className='divTableCell'>Height</div>
                <div className='divTableCell'>{" "}{Math.round(data.height * 3.9)}</div>
            </div>
            <div className='divTableRow'>
                <div className='divTableCell'>Weight</div>
                <div className='divTableCell'>{" "}{Math.round(data.weight/4.3) }</div>
                </div>
            </div>
            </div>
  

          )
        })}
    </div>
    </>
        
}

    </div>
  )
}

export default App
