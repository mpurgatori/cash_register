
const expect = require('chai').expect;
const cash = require('../register.js').cash;

//Tests all methods of the Cash Register "cash" class
describe('Cash Register Methods', ()=> {
  //Create new instance of register before each test
  beforeEach(()=> {
    testRegister = new cash();
  });

  it('add() should update cash and total as money is added', ()=> {
    expect(testRegister.add(1,1,1,1,1)).to.equal('$38 1x20 1x10 1x5 1x2 1x1');
    expect(testRegister.add(1,1,1,1,1)).to.equal('$76 2x20 2x10 2x5 2x2 2x1');
    expect(testRegister.add(3,3,3,3,3)).to.equal('$190 5x20 5x10 5x5 5x2 5x1');
  });

  it('take() should throw error when no money is available to take', ()=> {
    expect(testRegister.take(1,1,1,1,1)).to.equal('Sorry, not enough money to take.');
  });

  it('take() should update cash and total as money is taken away', ()=> {
    //add money to register before taking money away
    testRegister.add(3,3,3,3,3);
    expect(testRegister.take(1,1,1,1,1)).to.equal('$76 2x20 2x10 2x5 2x2 2x1');
    expect(testRegister.take(1,1,1,1,1)).to.equal('$38 1x20 1x10 1x5 1x2 1x1');
  });

  it('change() should return an error if not enough money to make change', ()=> {
    expect(testRegister.change(1)).to.equal('Sorry, not enough money to make change.');
  });

  it('change() should return the corect bills for makeChange amount and deduct from register totals', ()=> {
    //add money to register before making change
    testRegister.add(3,3,3,3,3);
    expect(testRegister.show()).to.equal('$114 3x20 3x10 3x5 3x2 3x1');
    expect(testRegister.change(87)).to.equal('3x20 2x10 1x5 1x2 0x1');
    expect(testRegister.show()).to.equal('$27 0x20 1x10 2x5 2x2 3x1');
  });

  //Case that was failing under fastmodel custom test
  it('change() should return the corect bills under all cases', ()=> {
    testRegister.add(0,1,3,4,0);
    expect(testRegister.change(26)).to.equal('0x20 1x10 2x5 3x2 0x1');
    expect(testRegister.show()).to.equal('$7 0x20 0x10 1x5 1x2 0x1');
    testRegister.take(0,0,1,1,0)
    testRegister.add(2,4,6,4,10);
    testRegister.take(1,4,3,0,10);
    testRegister.change(11);
    expect(testRegister.show()).to.equal('$32 1x20 0x10 2x5 1x2 0x1');
  });

  it('change() should error if theres enough money but not the correct combination of bills', ()=> {
    //add money to register before attempting to make change
    testRegister.add(1,1,1,1,0);
    expect(testRegister.change(11)).to.equal('Change can not be made with available bills.');
  });

  it('show() should display the correct amount of money and bills in register', ()=> {
    expect(testRegister.show()).to.equal('$0 0x20 0x10 0x5 0x2 0x1');
    //add money to register to show change in amounts
    testRegister.add(6,6,6,6,6);
    expect(testRegister.show()).to.equal('$228 6x20 6x10 6x5 6x2 6x1');
  });

});
