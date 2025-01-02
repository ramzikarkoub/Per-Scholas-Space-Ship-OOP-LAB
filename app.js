// Class representing a ship (player or alien)
class Ship {
  constructor(hull, firepower, accuracy) {
    (this.hull = hull),
      (this.firepower = firepower),
      (this.accuracy = accuracy);
  }
  attack() {}
}
// DOM elements for health bars and status display
const playerHealthBar = document.getElementById("player-health"); // Player's health bar
const alienHealthBar = document.getElementById("alien-health"); // Current alien's health bar
const statusDiv = document.getElementById("status"); // Status message display

// Event listener for the "Retreat" button
document.getElementById("retreat-btn").addEventListener("click", () => {
  gameOver("You retreated. Game over!"); // End game with retreat message
});
