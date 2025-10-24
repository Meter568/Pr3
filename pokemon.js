class Pokemon {
    constructor({name, defaultHP, damageHP, elHP, elProgressbar, lost}) {
        this.name = name;
        this.defaultHP = defaultHP;
        this.damageHP = damageHP;
        this.elHP = elHP;
        this.elProgressbar = elProgressbar;
        this.lost = lost;
        this.renderHP();
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    renderHP() {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    renderHPLife() {
        this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`;
    }

    renderProgressbarHP() {
        const hpPercent = this.damageHP;
        this.elProgressbar.style.width = this.damageHP + '%';
        this.elProgressbar.classList.remove('low', 'critical');
        if(hpPercent < 20) {
            this.elProgressbar.classList.add("critical");
        } else if (hpPercent < 50) {
            this.elProgressbar.classList.add("low");
        }
    }
}

export default Pokemon;