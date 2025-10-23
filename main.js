const $btnKick = document.getElementById('btn-kick');
const $btnWave = document.getElementById('btn-wave');
const $logs = document.querySelector('#logs');

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

const battle = {
    logs: []
}

const generateLog = (firstPerson, secondPerson, damage) => {
    const logs = [
        `${firstPerson.name.innerText} remembered something important, but suddenly ${secondPerson.name.innerText}, beside himself with fear, struck the enemy in the forearm.`,
        `${firstPerson.name.innerText} choked, and ${secondPerson.name.innerText}, in fright, delivered a direct knee strike to the enemy's forehead.`,
        `${firstPerson.name.innerText} forgot himself, but at that moment the impudent ${secondPerson.name.innerText}, having made a strong-willed decision, quietly approached from behind and struck.`,
        `${firstPerson.name.innerText} came to his senses, but suddenly ${secondPerson.name.innerText} accidentally dealt a powerful blow.`,
        `${firstPerson.name.innerText} choked, but at that moment ${secondPerson.name.innerText} reluctantly crushed his opponent with his fist \<censored\>.`,
        `${firstPerson.name.innerText} was surprised, and ${secondPerson.name.innerText} staggered and delivered a vile blow.`,
        `${firstPerson.name.innerText} blew his nose, but suddenly ${secondPerson.name.innerText} delivered a crushing blow.`,
        `${firstPerson.name.innerText} staggered, and suddenly the insolent ${secondPerson.name.innerText} kicked the enemy in the leg for no reason.`,
        `${firstPerson.name.innerText} was upset when suddenly, unexpectedly, ${secondPerson.name.innerText} accidentally kicked his opponent in the stomach.`,
        `${firstPerson.name.innerText} tried to say something, but suddenly, unexpectedly, ${secondPerson.name.innerText}, out of boredom, broke his opponent's eyebrow.`
    ];

    const text = logs[random(logs.length) - 1]

    const fullLog = `${text} -${damage} [${secondPerson.damageHP}/${secondPerson.defaultHP}]`

    return fullLog;
}

const attack = (character, enemy1, enemy2, maxDamage) => {
    $logs.innerHTML = '';

    const newLogs = [];

    const damageToEnemy1 = random(maxDamage)
    newLogs.push(generateLog(character, enemy1, damageToEnemy1))
    enemy1.changeHP(damageToEnemy1)

    const damageToEnemy2 = random(maxDamage)
    newLogs.push(generateLog(character, enemy2, damageToEnemy2))
    enemy2.changeHP(damageToEnemy2)

    const counterDamage1 = random(maxDamage)
    newLogs.push(generateLog(enemy1, character, counterDamage1))
    character.changeHP(counterDamage1)

    const counterDamage2 = random(maxDamage)
    newLogs.push(generateLog(enemy2, character, counterDamage2))
    character.changeHP(counterDamage2)

    newLogs.forEach(log => {
        const $p = document.createElement('p');
        $p.innerText = log;
        $logs.appendChild($p);
    });
}

const bindAttackButton = (button, maxDamage, character, enemy1, enemy2) => {
    button.addEventListener('click', () => {
        attack(character, enemy1, enemy2, maxDamage)
    })
}

bindAttackButton($btnKick, 20, character, enemy1, enemy2)
bindAttackButton($btnWave, 30, character, enemy1, enemy2)

function createButtonHandler(maxClick) {
    let clickCount = 0
    return function () {
        if(maxClick === null || clickCount < maxClick) {
            clickCount++
            const remainingClicks = maxClick === null ? 'необмежений' : maxClick - clickCount;
            console.log(`Кнопку натиснуто. Залишилося кліків: ${remainingClicks}`);
            if(maxClick !== null && clickCount >= maxClick) {
                console.log('Досягнуто максимальну кількість кліків. Відключення обробника подій.');
                this.disabled = true;
            }
        }
    }
}

$btnKick.addEventListener('click', createButtonHandler(10));
$btnWave.addEventListener('click', createButtonHandler(3));

const init = () => {
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
        const log = this === enemy1 || this === enemy2 ? generateLog(this, character) : generateLog(this, enemy1) + ' ' + generateLog(this, enemy2);
    }
    this.renderHP();
    checkGameOver();
}

const checkGameOver = () => {
    const {name: nameCharacter, damageHP: damageHPCharacter, lost: lostCharacter } = character
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
        lostCharacter = true;
        gameOver = true;
        $btnKick.disabled = true;
        $btnWave.disabled = true;
    }
}

const random = (num) => {
    return Math.ceil(Math.random() * num)
}

init();