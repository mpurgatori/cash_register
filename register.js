
//New class represents all register functions and states
class cash {
  constructor() {
    //represents amount of bills in register at any point as well as total money. Zero to start
    this.twenties = 0;
    this.tens = 0;
    this.fives = 0;
    this.twos = 0;
    this.ones = 0;
    this.total = 0;
  }
//show method returns current bill levels and money amount
  show(){
    return `$${this.total} ${this.twenties}x20 ${this.tens}x10 ${this.fives}x5 ${this.twos}x2 ${this.ones}x1`;
  }
//add method allows addition of bill amounts and totals new totals
  add(twenties, tens, fives, twos, ones) {
    this.twenties += twenties;
    this.tens += tens;
    this.fives += fives;
    this.twos += twos;
    this.ones += ones;
    this.total = (this.twenties*20)+(this.tens*10)+(this.fives*5)+(this.twos*2)+(this.ones);
    return `$${this.total} ${this.twenties}x20 ${this.tens}x10 ${this.fives}x5 ${this.twos}x2 ${this.ones}x1`;
  }
//take method allows subtractions of bill amounts and returns new totals
  take(twenties, tens, fives, twos, ones) {
    if(this.twenties-twenties<0||this.tens-tens<0||this.fives-fives<0||this.twos-twos<0||this.ones-ones<0) return 'Sorry, not enough money to take.';
    this.twenties -= twenties;
    this.tens -= tens;
    this.fives -= fives;
    this.twos -= twos;
    this.ones -= ones;
    this.total = (this.twenties*20)+(this.tens*10)+(this.fives*5)+(this.twos*2)+(this.ones);
    return `$${this.total} ${this.twenties}x20 ${this.tens}x10 ${this.fives}x5 ${this.twos}x2 ${this.ones}x1`;
  }
//change method takes an amount for change to be made and returns the bills for change and also deducts those bills from register total
  change(makeChange){
    //If change to be made is more than register amount return error
    if(this.total<makeChange) return 'Sorry, not enough money to make change.';
    //Create array of bill amounts and values for all bills
    let moneyArr = [[this.twenties,20],[this.tens,10],[this.fives,5],[this.twos,2],[this.ones,1]];
    //accum keeps running total of how much money has been used so far from bills
    let accum = 0;
    //deductArr will be used to deduct the bills from the given change from the total register amount of bills
    let deductArr = [];
    //map over moneyArr to check if enough bills of any combination can be made with whats available in the register
    let changeArr = moneyArr.map((el) => {
      let denomCount = el[0];
      let denomValue = el[1];
      let i = 0;
      while(i*denomValue+denomValue<=makeChange && accum+denomValue<=makeChange && denomCount){
        if(denomValue===5 && moneyArr[4][0]===0 && (makeChange-accum)%2===0 && makeChange-accum<10){
          break;
        }
        i++;
        denomCount--;
        accum+=denomValue;
      }
      deductArr.push(i);
      return `${i}x${denomValue}`;
    });
    //If the accumulated total does not equal the makeChange amount than return error that the right combo of bills are not available
    if(accum!==makeChange) return 'Change can not be made with available bills.';
    //Deduct the bills used to make change from the total register amount of bills
    this.twenties -= deductArr[0];
    this.tens -= deductArr[1];
    this.fives -= deductArr[2];
    this.twos -= deductArr[3];
    this.ones -= deductArr[4];
    this.total = (this.twenties*20)+(this.tens*10)+(this.fives*5)+(this.twos*2)+(this.ones);
    //Return the amount of bills used to make change as a string thats space seperated
    return changeArr.join(' ');
  }
}

let testRegister = new cash();


//export class for testing
module.exports = {
  cash
};
