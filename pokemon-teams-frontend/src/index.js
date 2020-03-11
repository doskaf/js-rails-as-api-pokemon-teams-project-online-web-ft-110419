const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {
    getTrainers();
});

function getTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => renderTrainers(json));
  }
  
  function renderTrainers(json) {
    json.forEach(trainer => {
      const main = document.getElementsByTagName("main")[0];

      let div = document.createElement('div');
      div.setAttribute('class', 'card');
      div.setAttribute('data-id', trainer.id);
      
      let p = document.createElement('p');
      p.innerText = trainer.name;
      div.appendChild(p);

      let button = document.createElement('BUTTON');
      button.setAttribute('data-trainer-id', trainer.id)
      button.innerText = "Add Pokemon";
      div.appendChild(button);
      addPokemonEventListener(button, trainer.id);

      let ul = document.createElement('UL');

      trainer.pokemons.forEach(pokemon => {
          let pokeLi = document.createElement('LI');
          pokeLi.innerText = `${pokemon.nickname} (${pokemon.species})`;

          let button2 = document.createElement('BUTTON');
          button2.setAttribute('class', 'release');
          button2.setAttribute('data-pokemon-id', pokemon.id)
          button2.innerText = "Release";
          pokeLi.appendChild(button2);
          releaseEventListener(button2, pokemon.id, pokeLi);

          ul.appendChild(pokeLi);
      })
      div.appendChild(ul);
      main.appendChild(div);
    })
  }

  function releaseEventListener(button, pokemonId, pokeLi) {
    button.addEventListener("click", function() {
        event.preventDefault();
        
        fetch(POKEMONS_URL + `/${pokemonId}`, {
            method: 'DELETE',
        })
        .then()
        .then((json) => {
            console.log(json)
            pokeLi.remove();
        })
    });
  }

  function addPokemonEventListener(button, trainerId) {
    button.addEventListener("click", function () {
        let trainerDiv = document.querySelector(`div[data-id='${trainerId}']`);

        if (trainerDiv.children[2].children.length < 6) {

            fetch(POKEMONS_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                  trainer_id: trainerId
                })
            })
            .then(function(response) {
              return response.json();
            })
            .then((json) => {
              displayNewPokemon(json, trainerDiv);
              console.log(json)
            })
        }
    });
  }

  function displayNewPokemon(json, trainerDiv) {
    let ul = trainerDiv.children[2];
    
    let li = document.createElement('LI');
    li.innerText = `${json.nickname} (${json.species})`;

    let button = document.createElement('BUTTON');
    button.setAttribute('class', 'release');
    button.setAttribute('data-pokemon-id', json.id)
    button.innerText = "Release";
    li.appendChild(button);
    releaseEventListener(button, json.id, li);

    ul.appendChild(li);
  }
