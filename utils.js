import { $logs } from "./main.js";

export const generateLog = (firstPerson, secondPerson, damage) => {
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

export const attack = (character, enemy1, enemy2, maxDamage) => {
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

export function createButtonHandler(maxClick) {
    let clickCount = 0
    return function () {
        if(maxClick === null || clickCount < maxClick) {
            clickCount++
            const remainingClicks = maxClick === null ? 'unlimited' : maxClick - clickCount;
            this.textContent = `${this.dataset.originalText} (${remainingClicks} clicks left)`;
            if(maxClick !== null && clickCount >= maxClick) {
                this.disabled = true;
                this.textContent = `${this.dataset.originalText} (exhausted)`;
            }
        }
    }
}

export const random = (num) => {
    return Math.ceil(Math.random() * num)
}