const $btnKick = document.getElementById('btn-kick');
const $btnWave = document.getElementById('btn-wave');

let gameOver = false;

const character = {
    name: document.getElementById('name-character'),
    defaultHP: 250,
    damageHP: 250,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    lost: false,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
    changeHP: changeHP,
}

const enemy1 = {
    name: document.getElementById('name-enemy-1'),
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy-1'),
    elProgressbar: document.getElementById('progressbar-enemy-1'),
    lost: false,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
    changeHP: changeHP,
}

const enemy2 = {
    name: document.getElementById('name-enemy-2'),
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy-2'),
    elProgressbar: document.getElementById('progressbar-enemy-2'),
    lost: false,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
    changeHP: changeHP,
}

function attack(character, enemy1, enemy2, maxDamage) {
    const damageToEnemy1 = random(maxDamage)
    console.log(`${character.name.innerText} attack ${enemy1.name.innerText} on ${damageToEnemy1} HP`)
    enemy1.changeHP(damageToEnemy1)

    const damageToEnemy2 = random(maxDamage)
    console.log(`${character.name.innerText} attack ${enemy2.name.innerText} on ${damageToEnemy2} HP`)
    enemy2.changeHP(damageToEnemy2)

    const counterDamage1 = random(maxDamage)
    console.log(`${enemy1.name.innerText} counterattacks ${character.name.innerText} on ${counterDamage1} HP`)
    character.changeHP(counterDamage1)

    const counterDamage2 = random(maxDamage)
    console.log(`${enemy2.name.innerText} counterattacks ${character.name.innerText} on ${counterDamage1} HP`)
    character.changeHP(counterDamage2)
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
    character.renderHP()
    enemy1.renderHP()
    enemy2.renderHP()
}

function renderHP() {
    this.renderHPLife()
    this.renderProgressbarHP()
}

function renderHPLife() {
    this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`;
}

function renderProgressbarHP() {
    const hpPercent = this.damageHP;
    this.elProgressbar.style.width = this.damageHP + '%';
    this.elProgressbar.classList.remove('low', 'critical')
    if(hpPercent < 20) {
        this.elProgressbar.classList.add("critical");
    } else if (hpPercent < 50) {
        this.elProgressbar.classList.add("low");
    }
}

function changeHP(count) {
    if(this.damageHP < count) {
        this.damageHP = 0;
        if(!this.lost) {
            alert('Poor ' + this.name.innerText + ' lost the fight!');
            this.lost = true;
        }
    } else {
        this.damageHP -= count;
    }
    this.renderHP();
    checkGameOver();
}

function checkGameOver() {
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