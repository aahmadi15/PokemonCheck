import { useEffect, useState } from 'react'
import './App.css'
function App() {
  const [pokemon, setPokemon]= useState();
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("")
  const [data, setData] = useState("")
  const [massPokemon, setMassPokemon] = useState([]);

  const [loading, setLoading] = useState(true);
   const [toArray] = useState([]);
  const url = `https://pokeapi.co/api/v2/pokemon?limit=50`;
const [pokemonList] = useState([])

  const getPokemon = async () => {
 
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      const res = await fetch(url, {
        method: "GET"
}
      )
      const data = await res.json()
      toArray.push(data)
      setPokemonType(data.types[0].type.name)
      setPokemonData(toArray)
      console.log(res)
    } catch(e){
      console.log(e)
    }
  }


  useEffect(() => {
    getPokemon()
      getAllPokemon()
    }
  , []);

const getAllPokemon = async () => {

  const response = await fetch(url);
  const res = await response.json();
    
  const pokemonData = await Promise.all(
    
    res.results.slice(0, 20).map (async (p) => {
      const pokeRes = await fetch(p.url)
      const pokeData = await pokeRes.json()
      console.log(pokeData)

      return {
        name: pokeData.name,
        image: pokeData.sprites.front_default,
      };
    })
  );

        //setMassPokemon(res.types[0].type.name)        
        setMassPokemon(pokemonData)

        console.log(pokemonList)
    }

    const handleVal = (e) => {
      setPokemon(e.target.value.toLowerCase())
    }


    const handleSubmit = (e) => {
      e.preventDefault();
      getPokemon();
    }

    const onClick = (e)=>{
      e.preventDefault();

    }
  return (
    <>

    <div className = "grid-container">
       <form onSubmit={handleSubmit}>
          <label>
            <input type="text" onChange = {handleVal} placeholder="Enter pokedex value"/>
          </label>
          <button onSubmit={onClick}>More</button>
        </form>  
    <div id = 'pokedex'>
      {massPokemon.map((gen)=> {
        return (
          <div className='pokemon-load-horizontal'> 
          <img src = {gen.image}/>
            {gen.name}
          </div>
      )
      })}
    </div>
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
             <button onClick={fetch}>Load More</button>
            </div>
  
           
          )
        })}
    </div>
    </>
        
  )
}

export default App
