import { $logs } from "./main.js";
import { player1, player2, player3 } from "./main.js";

export const generateLog = (firstPerson, secondPerson, damage) => {
    const logs = [
        `${firstPerson.name} remembered something important, but suddenly ${secondPerson.name}, beside himself with fear, struck the enemy in the forearm.`,
        `${firstPerson.name} choked, and ${secondPerson.name}, in fright, delivered a direct knee strike to the enemy's forehead.`,
        `${firstPerson.name} forgot himself, but at that moment the impudent ${secondPerson.name}, having made a strong-willed decision, quietly approached from behind and struck.`,
        `${firstPerson.name} came to his senses, but suddenly ${secondPerson.name} accidentally dealt a powerful blow.`,
        `${firstPerson.name} choked, but at that moment ${secondPerson.name} reluctantly crushed his opponent with his fist \<censored\>.`,
        `${firstPerson.name} was surprised, and ${secondPerson.name} staggered and delivered a vile blow.`,
        `${firstPerson.name} blew his nose, but suddenly ${secondPerson.name} delivered a crushing blow.`,
        `${firstPerson.name} staggered, and suddenly the insolent ${secondPerson.name} kicked the enemy in the leg for no reason.`,
        `${firstPerson.name} was upset when suddenly, unexpectedly, ${secondPerson.name} accidentally kicked his opponent in the stomach.`,
        `${firstPerson.name} tried to say something, but suddenly, unexpectedly, ${secondPerson.name}, out of boredom, broke his opponent's eyebrow.`
    ];

    const text = logs[random(logs.length) - 1]

    const fullLog = `${text} -${damage} [${secondPerson.hp.current}/${secondPerson.hp.total}]`;

    return fullLog;
}

export const attack = (character, enemy1, enemy2, maxDamage) => {
    $logs.innerHTML = '';

    const newLogs = [];

    const damageToEnemy1 = random(maxDamage)
    enemy1.changeHP(damageToEnemy1)
    newLogs.push(generateLog(character, enemy1, damageToEnemy1))

    const damageToEnemy2 = random(maxDamage)
    enemy2.changeHP(damageToEnemy2)
    newLogs.push(generateLog(character, enemy2, damageToEnemy2))

    const counterDamage1 = random(maxDamage)
    character.changeHP(counterDamage1)
    newLogs.push(generateLog(enemy1, character, counterDamage1))

    const counterDamage2 = random(maxDamage)
    character.changeHP(counterDamage2)
    newLogs.push(generateLog(enemy2, character, counterDamage2))

    newLogs.forEach(log => {
        const $p = document.createElement('p');
        $p.innerText = log;
        $logs.appendChild($p);
    });
}

export function countBtn(maxClick, button) {
    let clickCount = 0
    if(!button.dataset.originalText) {
        button.dataset.originalText = button.textContent.trim();
    }
    return function () {
        if(maxClick === null || clickCount < maxClick) {
            clickCount++;
            const remainingClicks = maxClick === null ? 'unlimited' : maxClick - clickCount;
            button.textContent = `${button.dataset.originalText} (${remainingClicks} clicks left)`;
            if(maxClick !== null && clickCount >= maxClick) {
                button.disabled = true;
                button.textContent = `${button.dataset.originalText} (exhausted)`;
            }
        }
    }
}

export const random = (num) => {
    return Math.ceil(Math.random() * num)
}

let gameOver = false;

export const checkGameOver = () => {
    if(gameOver) return;

    const enemiesAlive = [player2, player3].some(enemy => enemy.hp.current > 0);

    if(!enemiesAlive){
        alert(`${player1.name} defeated both enemies!`)
        gameOver = true;
        disableControls();
    } else if (player1.hp.current === 0) {
        alert(`${player1.name} has fallen! The enemies have won.`)
        gameOver = true;
        disableControls();
    }
}

const disableControls = () => {
    document.querySelectorAll('.control .button').forEach(btn => btn.disabled = true);
}