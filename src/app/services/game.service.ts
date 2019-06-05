import { Injectable } from '@angular/core';
import { C } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private optionsToWin = C.optionsToWin;
  public data = ['', '', '', '', '', '', '', '', '']; // array to populate the grid
  private nextStage = C.x; // var for next turn
  private x = []; // store the move of x user
  private o = []; // store the move of o user
  public winner = ''; // show the winner if exist

  constructor() { }

  putInCell(index: number) { // called after user click
    this.data[index] = this.nextStage; // put the about the user in the cell
    if (this.nextStage === C.x) {
      this.x.push(index + 1); // push the move to the user array
      console.log(this.doWeHaveWinner(this.nextStage)); // cacl if we have winner
      this.nextStage = C.o; // move to  the next turn
    } else {
      this.o.push(index + 1);
      console.log(this.doWeHaveWinner(this.nextStage));
      this.nextStage = C.x;
    }
  }

  doWeHaveWinner(user) {
    let arr = [];
    switch (user) { // get the user array base on the user who played
      case C.x:
        arr = this.x;
        break;
      case C.o:
        arr = this.o;
        break;
    }
    // console.log(arr);
    let haveWinner = false;
    if (arr.length < 3) { return haveWinner; } // if no more then 3 moves
    this.optionsToWin.forEach((option: string) => { // iterate the option to win
      let count = 0;
      arr.forEach(item => { // iterate user array
        if (option.includes(item)) { count++; } // if optinn includes the user choice then move the counter
      });
      if (count > 2) { // if the counter is 3 then we have a winner and no need to move to the next option
        haveWinner = true;
        return this.winner = user + ' ' + C.won;
      }
    });
    if (!haveWinner && arr.length === 5) {
      return this.winner = C.draw;
    }
    return haveWinner;
  }

  reset() {
    this.data = ['', '', '', '', '', '', '', '', ''];
    this.nextStage = C.x;
    this.x = [];
    this.o = [];
    this.winner = '';
  }
}
