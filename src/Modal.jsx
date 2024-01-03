import React, { useEffect } from "react";

export const Modal = ({ dialogModal, setDialogModal, selectedPokemon, selectedPokemonBackgroundType  }) => {
    useEffect(() => {
      console.log(selectedPokemon?.types[0]?.type.name);
      console.log(selectedPokemon);
        const handleClickOutsideDialog = (e) => {
          const dialogDimensions = dialogModal.getBoundingClientRect();
          if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
          ) {
            dialogModal.close();
            console.log("closing");
          }
        };
    
        document.addEventListener('click', handleClickOutsideDialog);
    
        return () => {
          document.removeEventListener('click', handleClickOutsideDialog);
        };
      }, [dialogModal]);

      const getImage = (id) => {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      }

      const getTypeIconSrc = (type) => `./types-icons/${ type }.svg`;

  return (
    <div>
         
         <dialog className={ `modal ${ selectedPokemon?.types[0]?.type.name }` } style={{ background: selectedPokemonBackgroundType }} data-content={selectedPokemon?.name}>
          

            {selectedPokemon && (
          <>
          <div className="top">
          <a
                className='arrow-back'
                onClick={() => dialogModal.close()}
            ></a>
            
            <div className="top-info">
              <img className="img-pokemon-modal" src={getImage(selectedPokemon.id)} alt={selectedPokemon.name} />
              <div className="pokemon-modal-title-info">
                  <span className="modal-id-number">#{selectedPokemon.id.toString().padStart(3, '0')}</span>
                  <span className="modal-pokemon-name">{selectedPokemon.name}</span>
                  <div className="types">
                  {
                            selectedPokemon.types.map(({ type: { name } }) => {
                                const typeImg = getTypeIconSrc(name)
                                return (
                                    <div key={ name } className={ name }>
                                        <img className="type-icon" src={ typeImg } alt={ name } />
                                        <span className='type-name'>{ name }</span>
                                    </div>
                                );
                            })
                        }
                  </div>
              </div>

            </div>
          </div>
          <div className="bottom-modal">
          <h4>Pokédex Data</h4>
          <table>
                <tbody>
                   
                    <tr>
                        <td className='category'>Height</td>
                        <td>{ selectedPokemon.height }</td>
                    </tr>
                    <tr>
                        <td className='category'>Weight</td>
                        <td>{ selectedPokemon.weight }</td>
                    </tr>

                    <tr>
                        <td className='category'>Abilities</td>
                        <td>
                            <ol>
                                {
                                    selectedPokemon.abilities.map(({ ability, is_hidden }) => {
                                        if(is_hidden) {
                                            return <small key={ ability.name }>{ ability.name } (hidden ability)</small>
                                        }
                                        
                                        return <li key={ ability.name }>{ ability.name}</li>
                                    })
                                }
                            </ol>
                        </td>
                    </tr>

                    <tr>
                        <td className='category'>Types</td>
                        <td>
                            {
                                selectedPokemon.types.map(({ type: { name } }) => {
                                    const typeImage = getTypeIconSrc(name);

                                    return <img key={ name } className={ name } src={ typeImage } alt={ name } />
                                })
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
          </div>


          
          </>
        )}
      </dialog>
    </div>
  );
};
