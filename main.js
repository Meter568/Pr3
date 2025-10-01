const $btnKick = document.getElementById('btn-kick');
const $btnWave = document.getElementById('btn-wave');

let gameOver = false;

const character = {
    name: document.getElementById('name-character'),
    defaultHP: 250,
    damageHP: 250,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    lost: false
}

const enemy1 = {
    name: document.getElementById('name-enemy-1'),
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy-1'),
    elProgressbar: document.getElementById('progressbar-enemy-1'),
    lost: false
}

const enemy2 = {
    name: document.getElementById('name-enemy-2'),
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy-2'),
    elProgressbar: document.getElementById('progressbar-enemy-2'),
    lost: false
}

function attack(character, enemy1, enemy2, maxDamage) {
    const damageToEnemy1 = random(maxDamage)
    console.log(`${character.name.innerText} attack ${enemy1.name.innerText} on ${damageToEnemy1} HP`)
    changeHP(damageToEnemy1, enemy1)
    const damageToEnemy2 = random(maxDamage)
    console.log(`${character.name.innerText} attack ${enemy2.name.innerText} on ${damageToEnemy2} HP`)
    changeHP(damageToEnemy2, enemy2)
    const counterDamage1 = random(maxDamage)
    console.log(`${enemy1.name.innerText} counterattacks ${character.name.innerText} on ${counterDamage1} HP`)
    changeHP(counterDamage1, character)
    const counterDamage2 = random(maxDamage)
    console.log(`${enemy2.name.innerText} counterattacks ${character.name.innerText} on ${counterDamage1} HP`)
    changeHP(counterDamage2, character)
}

function bindAttackButton(button, maxDamage, character, enemy1, enemy2) {
    button.addEventListener('click', () => {
        attack(character, enemy1, enemy2, maxDamage)
    })
}

bindAttackButton($btnKick, 20, character, enemy1, enemy2)
bindAttackButton($btnWave, 30, character, enemy1, enemy2)

function init() {
    console.log('Start Game')
    renderHP(character)
    renderHP(enemy1)
    renderHP(enemy2)
}

function renderHP(person) {
    renderHPLife(person)
    renderProgressbarHP(person)
}

function renderHPLife(person) {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
}

function renderProgressbarHP(person) {
    const hpPercent = person.damageHP;
    person.elProgressbar.style.width = person.damageHP + '%';

    person.elProgressbar.classList.remove('low', 'critical')

    if(hpPercent < 20) {
        person.elProgressbar.classList.add("critical");
    } else if (hpPercent < 50) {
        person.elProgressbar.classList.add("low");
    }
}

function changeHP(count, person) {
    if(person.damageHP < count) {
        person.damageHP = 0;
        if(!person.lost) {
            alert('Poor ' + person.name.innerText + ' lost the fight!');
            person.lost = true;
        }
    } else {
        person.damageHP -= count;
    }
    renderHP(person);

    if(enemy1.damageHP === 0 && enemy2.damageHP === 0 && !gameOver) {
        alert(`${character.name.innerText} defeated both enemies!`)
        gameOver = true;
        $btnKick.disabled = true;
        $btnWave.disabled = true;
    } 
    if(character.damageHP === 0) {
        alert(`${character.name.innerText} has fallen! The enemies have won.`)
        character.lost = true;
        gameOver = true;
        $btnKick.disabled = true;
        $btnWave.disabled = true;
    }
}

function random(num) {
    return Math.ceil(Math.random() * num)
}

init();