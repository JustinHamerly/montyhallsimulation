function Game() {
  this.doorwin = 0;
  this.doorpick = 0;
  this.doorshow = 0;
  this.trials = 0;
  this.wins = 0;
  this.losses = 0;
  this.door1 = document.getElementById("1");
  this.door2 = document.getElementById("2");
  this.door3 = document.getElementById("3");
  this.swapButton = document.getElementById("swap");
  this.stayButton = document.getElementById("stay");
  this.resetButton = document.getElementById("reset");
  this.nextButton = document.getElementById("nextTrial");
  this.gameButtons = document.getElementById("gameButtons");

  this.pickDoor = (e) => {
    const doorNum = parseInt(e.target.id);
    this.doorwin = this._pickRandom();
    this.doorpick = doorNum;
    this.outlineDoorPick();
    let tempDoor = this._pickRandom();
    while (tempDoor == this.doorwin || tempDoor == this.doorpick) {
      tempDoor = this._pickRandom();
    }
    this.doorshow = tempDoor;
    this.door1.removeEventListener("click", this.pickDoor);  
    this.door2.removeEventListener("click", this.pickDoor);  
    this.door3.removeEventListener("click", this.pickDoor);  
    console.log(this.doorshow)
    if(this.doorshow == 1){
      this.door1.style.backgroundColor = "#4C431B";
    }if(this.doorshow == 2){
      this.door2.style.backgroundColor = "#4C431B";
    }if(this.doorshow == 3){
      this.door3.style.backgroundColor = "#4C431B";
    }

    this.gameButtons.style.visibility = "visible";

    this.stayButton.addEventListener("click", this.stay);
    this.swapButton.addEventListener("click", this.swap);
  };

  this.stay = () => {
    console.log("stay")
    this.gameButtons.style.visibility = "hidden";
    this.stayButton.removeEventListener("click", this.stay);
    this.swapButton.removeEventListener("click", this.swap);
    this.calculateWin();
    this.nextButton.style.visibility = "visible";
  }

  this.swap = () => {
    console.log("swap")
    let tempDoor = this._pickRandom();
    while (tempDoor == this.doorpick || tempDoor == this.doorshow) {
      tempDoor = this._pickRandom();
    }
    this.doorpick = tempDoor;
    this.outlineDoorPick();
    this.gameButtons.style.visibility = "hidden";
    this.stayButton.removeEventListener("click", this.stay);
    this.swapButton.removeEventListener("click", this.swap);
    this.calculateWin();
    this.nextButton.style.visibility = "visible";
  };

  this.outlineDoorPick = () => {
    if (this.doorpick == 1) {
      this.door1.style.borderColor = "#6699D3";
      this.door2.style.borderColor = "#000000";
      this.door3.style.borderColor = "#000000";
    } else if (this.doorpick == 2) {
      this.door1.style.borderColor = "#000000";
      this.door2.style.borderColor = "#6699D3";
      this.door3.style.borderColor = "#000000";
    } else if (this.doorpick == 3) {
      this.door1.style.borderColor = "#000000";
      this.door2.style.borderColor = "#000000";
      this.door3.style.borderColor = "#6699D3";
    }
  };

  this.calculateWin = () => {
    switch (this.doorwin) { 
      case 1:
        this.door1.style.backgroundColor = "#C2EABD";
        break;
      case 2:
        this.door2.style.backgroundColor = "#C2EABD";
        break;
      case 3:
        this.door3.style.backgroundColor = "#C2EABD";
        break;
    }

    if (this.doorpick == this.doorwin) {
      this.wins++;
      document.getElementById("winsText").textContent = this.wins;
    } else {
      this.losses++;
      document.getElementById("lossesText").textContent = this.losses;
      switch (this.doorpick) {
        case 1:
          this.door1.style.backgroundColor = "#ED254E";
          break;  
        case 2:
          this.door2.style.backgroundColor = "#ED254E";
          break;  
        case 3:
          this.door3.style.backgroundColor = "#ED254E";
          break;  
      }
    }

  };

  this.newRound = () => {
    this.trials++;
    this.doorpick = 0;
    this.doorwin = 0;
    this.doorshow = 0;
    this.door1.style.backgroundColor = "#465362";
    this.door2.style.backgroundColor = "#465362";
    this.door3.style.backgroundColor = "#465362";
    this.door1.style.borderColor = "#000000";
    this.door2.style.borderColor = "#000000";
    this.door3.style.borderColor = "#000000";

    this.door1.addEventListener("click", this.pickDoor);
    this.door2.addEventListener("click", this.pickDoor);
    this.door3.addEventListener("click", this.pickDoor);

    document.getElementById("roundText").textContent = this.trials;
    this.resetButton.addEventListener('click', this.reset);
    this.nextButton.style.visibility = "hidden";
  };

  this.reset = () => {
    this.trials = 0;
    this.wins = 0;
    this.losses = 0;
    this.newRound();
    document.getElementById("winsText").textContent = this.wins;
    document.getElementById("lossesText").textContent = this.losses;
    this.nextButton.addEventListener('click', this.newRound);
  }

  this._pickRandom = () => {
    return Math.ceil(Math.random() * 3);
  };
}

const game = new Game();
game.reset();