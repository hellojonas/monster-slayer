const genRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  watch: {
    playerHealth() {
      if (this.playerHealth <= 0 && this.monsterHealth <= 0) {
        this.winner = 'draw';
        this.playerHealth = 0;
        this.monsterHealth = 0;
      } else if (this.playerHealth <= 0) {
        this.winner = 'monster';
        this.playerHealth = 0;
      }
    },
    monsterHealth() {
      if (this.monsterHealth <= 0) {
        this.monsterHealth = 0;
        this.winner = 'player';
      }
    },
  },
  computed: {
    monsterBarStyle() {
      return { width: `${this.monsterHealth}%` };
    },
    playerBarStyle() {
      return { width: `${this.playerHealth}%` };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
    },
    surrender() {
      this.winner = 'monster';
    },
    attackMonster() {
      const attackValue = genRandomValue(5, 12);
      this.currentRound++;
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'attack', attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = genRandomValue(8, 15);
      this.addLogMessage('monster', 'attack', attackValue);
      this.playerHealth -= attackValue;
    },
    specialAttackMonster() {
      const attackValue = genRandomValue(10, 25);
      this.currentRound++;
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'attack', attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      const healValue = genRandomValue(8, 20);
      this.currentRound++;

      if (this.playerHealth + healValue > 100) this.playerHealth = 100;
      else this.playerHealth += healValue;

      this.addLogMessage('player', 'heal', healValue);
      this.attackPlayer();
    },
    addLogMessage(actionBy, actionType, actionValue) {
      this.logMessages.unshift({ actionBy, actionType, actionValue });
    },
  },
});

app.mount('#game');
