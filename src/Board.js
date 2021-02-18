import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *

 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    LightOnOff: 0.25
  };
  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
    this.setState()
    // TODO: set initial state
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    // TODO: create array-of-arrays of true/false values
    let board = [];
    for (let y = 0; y < this.props.nrows; y++){
      let row = [];
      for (let x = 0; x < this.props.ncols; x++){
        row.push(Math.random() < this.props.LightOnOff);
      }
      board.push(row);
    }
    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      //Flip initial cell
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    // flip this cell and the cells around it
    flipCell(y, x); //flip inisial cell
    flipCell(y, x + 1); //flip right
    flipCell(y, x - 1); //flip left
    flipCell(y + 1, x); //flip above
    flipCell(y - 1, x ); //flip below

  
    // win when every cell is turned off
    // determine is the game has been won
    let hasWon = board.every(row => row.every(cell => !cell));

    this.setState({ board: board, hasWon: hasWon });
  }

  /** Render game board or winning message. */
  render() {
    if (this.state.hasWon) {
      return (
        <div className="Board-title">
          <div className="winner">
            <span className="neon-green-orange">You</span>
            <span className="neon-blue">Win</span>
          </div>
      </div>
      )
    }
    let tblBoard = [];
    for(let y = 0; y < this.props.nrows; y++){
      let row = [];
      for( let x = 0; x < this.props.ncols; x++){
        let coord = `${y}-${x}`;
        row.push(
        <Cell 
          key={coord} 
          isLit={this.state.board[y][x]} 
          flipCellsAroundMe={() => this.flipCellsAround(coord)}
          />);
      }
      tblBoard.push(<tr key={y}>{row}</tr>);
      
    }
    return  (
      <div>
        <div className="Board-title">
          <div className="neon-green-orange">Lights</div>
          <div className="neon-blue">Out</div>
        </div>
        <table className="Board">
          <tbody>{ tblBoard } </tbody>
        </table>
      </div>
    );
    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
  }
}


export default Board;
