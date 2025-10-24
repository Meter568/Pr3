import Pokemon from "./pokemon.js";
import { attack, createButtonHandler, generateLog } from "./utils.js";

const $btnKick = document.getElementById('btn-kick');
const $btnWave = document.getElementById('btn-wave');
export const $logs = document.querySelector('#logs');

$btnKick.dataset.originalText = $btnKick.innerText.trim();
$btnWave.dataset.originalText = $btnWave.innerText.trim();

$btnKick.innerText = `${$btnKick.dataset.originalText} (10 clicks left)`;
$btnWave.innerText = `${$btnWave.dataset.originalText} (3 clicks left)`;

let gameOver = false;

const character = new Pokemon({
    name: document.getElementById('name-character'),
    defaultHP: 250,
    damageHP: 250,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    lost: false,
})

const enemy1 = new Pokemon({
    name: document.getElementById('name-enemy-1'),
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy-1'),
    elProgressbar: document.getElementById('progressbar-enemy-1'),
    lost: false,
})

const enemy2 = new Pokemon({
    name: document.getElementById('name-enemy-2'),
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy-2'),
    elProgressbar: document.getElementById('progressbar-enemy-2'),
    lost: false,
})

const bindAttackButton = (button, maxDamage, character, enemy1, enemy2) => {
    button.addEventListener('click', () => {
        attack(character, enemy1, enemy2, maxDamage)
    })
}

bindAttackButton($btnKick, 20, character, enemy1, enemy2)
bindAttackButton($btnWave, 30, character, enemy1, enemy2)

$btnKick.addEventListener('click', createButtonHandler(10));
$btnWave.addEventListener('click', createButtonHandler(3));

const init = () => {
    console.log('Start Game')
    character.renderHP()
    enemy1.renderHP()
    enemy2.renderHP()
}

function changeHP(count){
    if(this.damageHP < count) {
        this.damageHP = 0;
        if(!this.lost) {
            alert(`Poor ${this.name.innerText} has lost the fight!`)
            this.lost = true;
        }
    } else {
        this.damageHP -= count;
        if(typeof generateLog === 'function') {
            if(this === enemy1 || this === enemy2) {
                generateLog(this, character);
            } else {
                generateLog(this, enemy1) + ' ' + generateLog(this, enemy2);
            }
        }
    }
    this.renderHP();
    checkGameOver();
}

character.changeHP = changeHP.bind(character);
enemy1.changeHP = changeHP.bind(enemy1);
enemy2.changeHP = changeHP.bind(enemy2);

const checkGameOver = () => {
    const {name: nameCharacter, damageHP: damageHPCharacter } = character
    const {damageHP: damageHPEnemy1 } = enemy1
    const {damageHP: damageHPEnemy2 } = enemy2

    if(damageHPEnemy1 === 0 && damageHPEnemy2 === 0 && !gameOver) {
        alert(`${nameCharacter.innerText} defeated both enemies!`)
        gameOver = true;
        $btnKick.disabled = true;
        $btnWave.disabled = true;
    } 
    if(damageHPCharacter === 0) {
        alert(`${nameCharacter.innerText} has fallen! The enemies have won.`)
        character.lost = true;
        gameOver = true;
        $btnKick.disabled = true;
        $btnWave.disabled = true;
    }
}

init();