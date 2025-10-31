import Pokemon from "./pokemon.js";
import { attack, countBtn } from "./utils.js";
import { pokemons } from "./pokemons.js";

const $img1 = document.querySelector('.sprite1');
const $img2 = document.querySelector('.sprite2');
const $img3 = document.querySelector('.sprite3');

const $characterName = document.querySelector('#name-player1');
const $enemyName1 = document.querySelector('#name-player2');
const $enemyName2 = document.querySelector('#name-player3');

const pikachu = pokemons.find(item => item.name === 'Pikachu');
export const player1 = new Pokemon({
    ...pikachu,
    selector: 'player1'
})
$img1.src = pikachu.img;
$img1.alt = pikachu.name;
$characterName.textContent = pikachu.name;

const index1 = Math.floor(Math.random() * (pokemons.length - 1)) + 1;

const randomPokemon1 = pokemons[index1];
export const player2 = new Pokemon({
    ...randomPokemon1,
    selector: 'player2'
})
$img2.src = randomPokemon1.img;
$img2.alt = randomPokemon1.name;
$enemyName1.textContent = randomPokemon1.name;

let index2;
do {
    index2 = Math.floor(Math.random() * (pokemons.length - 1)) + 1;
} while (index2 === index1);

const randomPokemon2 = pokemons[index2];
export const player3 = new Pokemon({
    ...randomPokemon2,
    selector: 'player3'
})
$img3.src = randomPokemon2.img;
$img3.alt = randomPokemon2.name;
$enemyName2.textContent = randomPokemon2.name;

const $control = document.querySelector('.control');
player1.attacks.forEach(attackData => {
    const $btn = document.createElement('button');
    $btn.classList.add('button');
    $btn.innerText = `${attackData.name}`;
    const btnCount = countBtn(attackData.maxCount, $btn);
    $btn.addEventListener('click', () => {
        attack(player1, player2, player3, attackData.maxDamage);
        btnCount();
    })
    $control.appendChild($btn);
})

export const $logs = document.querySelector('#logs');

const init = () => {
    console.log('Start Game')
    player1.renderHP()
    player2.renderHP()
    player3.renderHP()
}

init();