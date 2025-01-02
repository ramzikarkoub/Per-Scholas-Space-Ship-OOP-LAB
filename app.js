// Class representing a ship (player or alien)
class Ship {
  constructor(hull, firepower, accuracy) {
    this.hull = hull; // Current health of the ship
    this.maxHull = hull; // Maximum health of the ship (for health bar scaling)
    this.firepower = firepower; // Damage the ship deals per attack
    this.accuracy = accuracy; // Probability of successfully hitting the target
  }

  // Method for attacking another ship
  attack(target) {
    // Check if the attack hits based on the accuracy
    if (Math.random() < this.accuracy) {
      target.hull -= this.firepower; // Reduce the target's health by firepower
      return true; // Attack successful
    }
    return false; // Attack missed
  }

  // Check if the ship is destroyed
  isDestroyed() {
    return this.hull <= 0; // Returns true if hull is zero or less
  }
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
console.log(alienHealthBar);
const statusDiv = document.getElementById("status"); // Status message display
//number of enemy yleft
const enemyCount = document.querySelector(".enemyCount");
console.log(enemyCount.value);
// the US shipt Hull count
const usHull = document.querySelector(".usHull");
console.log(usHull.value);
// Event listener for the "Retreat" button
document.getElementById("retreat-btn").addEventListener("click", () => {
  gameOver("You retreated. Game over!"); // End game with retreat message
});
// Event listener for the "Attack" button
document.getElementById("attack-btn").addEventListener("click", battleRound);

function updateHealthBars() {
  // Update player's health bar based on remaining hull percentage
  playerHealthBar.style.width = `${(USShip.hull / USShip.maxHull) * 100}%`;
  // Update alien's health bar based on remaining hull percentage
  const currentAlien = alienFleet[currentAlienIndex];
  alienHealthBar.style.width = `${
    (currentAlien.hull / currentAlien.maxHull) * 100
  }%`;
}
// Variable to track which alien ship is currently in battle
let currentAlienIndex = 0;
let numberOfEnemyLeft = alienFleet.length - 1;
console.log(numberOfEnemyLeft);
// counter.textContent = numberOfEnemyLeft;

function battleRound() {
  const currentAlien = alienFleet[currentAlienIndex]; // Get the current alien ship
  console.log("currentAlien", currentAlien);
  console.log("currentAlienIndex", currentAlienIndex);
  // Player's turn to attack
  if (USShip.attack(currentAlien)) {
    statusDiv.textContent = "You hit the alien ship!"; // Display success message
    console.log(numberOfEnemyLeft);
    //Decrement the number os enemy ships left
    numberOfEnemyLeft--;
    enemyCount.textContent = numberOfEnemyLeft;
  } else {
    statusDiv.textContent = "You missed!"; // Display miss message
  }

  // Check if the alien ship is destroyed
  if (currentAlien.isDestroyed()) {
    statusDiv.textContent += " Alien ship destroyed!"; // Update status
    currentAlienIndex++; // Move to the next alien in the fleet
    if (currentAlienIndex >= alienFleet.length || numberOfEnemyLeft <= 0) {
      // Check if all aliens are destroyed
      gameOver("You destroyed all alien ships! You win!"); // End game with win message
      return;
    }
    statusDiv.textContent += " A new alien ship approaches!"; // New alien incoming
    updateHealthBars(); // Reset health bar for the new alien
    return;
  }

  // Alien's attack (after a delay)
  setTimeout(() => {
    if (currentAlien.attack(USShip)) {
      statusDiv.textContent = "The alien ship hit you!"; // Display hit message
      usHull.textContent = USShip.hull;
    } else {
      statusDiv.textContent = "The alien ship missed!"; // Display miss message
    }

    // Check if the player's ship is destroyed
    if (USShip.isDestroyed()) {
      console.log("we are fucked");
      gameOver("Your ship has been destroyed! You lose."); // End game with loss message
    }

    updateHealthBars(); // Update health bars after the attack
  }, 1000); // Delay for 1 second
}

// Function to handle the end of the game
function gameOver(message) {
  statusDiv.textContent = message; // Display game-over message
  // Disable buttons to prevent further actions
  document.getElementById("attack-btn").disabled = true;
  document.getElementById("retreat-btn").disabled = true;
  statusDiv.textContent = "";
  alert(message);
}
