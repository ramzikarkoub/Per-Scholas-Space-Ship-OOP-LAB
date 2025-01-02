// Class representing a ship (player or alien)
class Ship {
  constructor(hull, firepower, accuracy) {
    (this.hull = hull),
      (this.firepower = firepower),
      (this.accuracy = accuracy);
  }
  attack() {}
}

// Initialize the player's ship with fixed stats
const USShip = new Ship(20, 5, 0.7); // 20 health, 5 damage, 70% accuracy

// Generate an alien fleet with random stats for each alien ship
const alienFleet = Array.from({ length: 6 }, () => {
  return new Ship(
    Math.floor(Math.random() * 4) + 3, // Random hull between 3 and 6
    Math.floor(Math.random() * 3) + 2, // Random firepower between 2 and 4
    Math.random() * 0.2 + 0.6 // Random accuracy between 0.6 and 0.8
  );
});
console.log(alienFleet[0].firepower);

// DOM elements for health bars and status display
const playerHealthBar = document.getElementById("player-health"); // Player's health bar
const alienHealthBar = document.getElementById("alien-health"); // Current alien's health bar
const statusDiv = document.getElementById("status"); // Status message display
document.getElementById("attack-btn").addEventListener("click", battleRound);

// Event listener for the "Retreat" button
document.getElementById("retreat-btn").addEventListener("click", () => {
  gameOver("You retreated. Game over!"); // End game with retreat message
});
// Event listener for the "Attack" button
document.getElementById("attack-btn").addEventListener("click", battleRound);

function battleRound() {}
