import { checkGameOver } from "./utils.js";

class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({name, hp, type, selector, attacks = []}) {
        super(selector);
        this.name = name;
        this.hp = {
            current: hp,
            total: hp,
        }
        this.type = type;
        this.attacks = attacks;
        this.renderHP();
    }

    renderHP() {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    renderHPLife() {
        this.elHP.innerText = `${this.hp.current} / ${this.hp.total}`;
    }

    renderProgressbarHP() {
        const hpPercent = (this.hp.current / this.hp.total) * 100;
        this.elProgressbar.style.width = hpPercent + '%';
        this.elProgressbar.classList.remove('low', 'critical');
        if(hpPercent < 20) {
            this.elProgressbar.classList.add("critical");
        } else if (hpPercent < 50) {
            this.elProgressbar.classList.add("low");
        }
    }

    changeHP(damage) {
        this.hp.current -= damage;
        if(this.hp.current < 0) {
            this.hp.current = 0;
        }
        this.renderHP();
        checkGameOver();
    }
}

export default Pokemon;