import React from 'react'


export const Card = ({pokemon, onCardClick}) => {

  const handleCardClick = (event, pokemon,) => {
    event.stopPropagation(); // Stop event propagation to prevent closing the modal
    onCardClick(pokemon,getTypeBackground(pokemon.types));
  };

  const typeColors = {
  normal: '#8a8a8a',
  fire: '#c48476',
  water: '#bdeaff',
  electric: '#e1bd70',
  grass: '#89a84f',
  ice: '#a3d8e2',
  fighting: '#ab3e48',
  poison: '#897490',
  ground: '#9b8254',
  flying: '#C1ADFB',
  psychic: '#F85888',
  bug: '#98c459',
  rock: '#a09586',
  ghost: '#615d73',
  dragon: '#a279e8',
  dark: '#5f5f5f',
  steel: '#95989c',
  fairy: '#e68bae',
    // Add more type colors here
  };

  const getTypeBackground = (types) => {
    if (types.length === 1) {
      return typeColors[types[0].type.name] || '';
    } else if (types.length === 2) {
      const type1 = types[0].type.name;
      const type2 = types[1].type.name;
      const color1 = typeColors[type1] || '';
      const color2 = typeColors[type2] || '';
      return `linear-gradient(to bottom right, ${color1}, ${color2})`;
    }
    return '';
  };

  const getTypeBoxShadowColor = (types) => {
    if (types.length === 1) {
      return typeColors[types[0].type.name] || '';
    } else if (types.length === 2) {
      return typeColors[types[1].type.name] || '';
    }
    return '';
  };

  const getImage = (id) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  }

  return ( 
    <>
      {pokemon.map(p=>(
        
        <div key={p.name} onClick={(event) => handleCardClick(event, p)} style={{ background: getTypeBackground(p.types),  boxShadow: `0 5px 10px 0 ${getTypeBoxShadowColor(p.types)}` }} className="thumb-container">
        <div className="number"><small>#{p.id.toString().padStart(3, '0')}</small></div>
        <img className="img-container" src={getImage(p.id)} alt={p.name} />
            <div className="detail-wrapper">
                <h3>{p.name}</h3>
                <div>
                <small>Type: {p.types.map((type) => type.type.name).join('/')}</small>
            </div>
            </div>
        </div>
        
        
        
    ))
    }


    </>
  )
}
