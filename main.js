function checkCashRegister(price, cash, cid) {

    //A lookup table of currency values
    const currency = {
      "ONE HUNDRED": 100,
      TWENTY: 20,
      TEN: 10,
      FIVE: 5,
      ONE: 1,
      QUARTER: 0.25,
      DIME: 0.1,
      NICKEL: 0.05,
      PENNY: 0.01
    };

    //Establish Register object to represent state
    let register = {status:"", change: cid};

    let change = cash - price; //How much total change to give.
    let changeDue = []; //A list of what/how much change to give.
    let registerValue = 0; 
    cid.map((elem) => {registerValue += elem[1]}); //Get and store the current total value of the register.
  
    //If this is the last transaction and we are empty, close the register and give the remaining contents.
    if(change === registerValue) {
      register.status = "CLOSED";
      register.change = cid;
      return register;
    }
  
    //Sort the cash in drawer, for both presentation and my change-making algorithm. 
    //It makes it easier to determine which bill is appropiate for making change.
    const holder = cid;
    cid = [];
    for (const type in currency) {
      for(const item of holder) {
        if(type === item[0]) { cid.push(item); }
      }
    }
  
    //Here is where the magic happens. Begin by iterating through everything in the drawer.
    for(const bill of cid) {
        
        //I need to know the value of the current bill I'm looking at, and how much is in the register.
        let value = currency[bill[0]];
        let amountInRegister = bill[1] / value;

        //If this bill is suitable for change, and have any in register to do so.
        //In other words, how many bills does it take to cover the change? If it's less than one bill,
        //we would be giving too much change.
        let billAmount = Math.floor(change / value);
        if(billAmount >= 1 && amountInRegister > 0) {

          //If I have less than what I need, give it all. Otherwise, only what's needed
          if(amountInRegister <= billAmount) {
            changeDue.push(new Array(bill[0], amountInRegister * value));
            change -= amountInRegister.toFixed(2) * value;
          } else {
            changeDue.push(new Array(bill[0], billAmount*value));
            change -= billAmount*value;
          }

          //JS floating point MADNESS. Prevents calculations returning 0.00999999999997 instead of 0.01.
          change = parseFloat(change.toFixed(2));
        }
    }
    
    //After attemtping to make change...

    //If there is no remaining change due, and this isn't our last transaction (see line 31)
    //return status OPEN and the amount of change due in each bill.
    if(change === 0) {
      register.status = "OPEN";
      register.change = changeDue;

    //If there is still change due, and we can't make exact change, transaction fails and no change is due.
    } else if(change > 0) {
      register.status = "INSUFFICIENT_FUNDS";
      register.change = [];
    }
    
    return register;
}

  /* A more detailed implementation than this would see input handling before calling this function,
    and possibly a method that reads the register output from this function. This post-method would actually
    perform the transaction and see it through after getting the information from this method. */

console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], 
["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], 
["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], 
["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], 
["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));