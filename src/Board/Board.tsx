import React, { useState, useEffect, useRef } from "react";
import "./board.css";
import {randomIntFromRange, useInterval} from "./utils";

const BOARD_SIZE: number = 15;

interface IVal {
  row: number;
  col: number;
  cell: number;
}

interface ICoords {
  row: number;
  col: number;
}

class Node {
  val: IVal;
  next: Node | null;

  constructor(val: IVal) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  head: Node;
  tail: Node;
  constructor(val: IVal) {
    const node = new Node(val);
    this.head = node;
    this.tail = node;
  }
}

enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  RIGHT = "RIGHT",
  LEFT = "LEFT",
}

export const Board = () => {
  const [board, setboard] = useState(createBoard(BOARD_SIZE));
  const [snakeCells, setSnakeCells] = useState(new Set([106]));
  const [snake, setSnake] = useState(
    new LinkedList({ row: 7, col: 0, cell: 106 })
  );
  const [direction, setDirection] = useState<string>(Direction.RIGHT);
  const [foodCell, setFoodCell] = useState(snake.head.val.cell + 5);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      handleKeydown(e);
    });
    
  }, []);

  useInterval(moveSnake, 150);

  const handleKeydown = (e: KeyboardEvent) => {
    const newDirection = getDirectionFromKey(e.key);
      const isValidDirection = newDirection !== "";
      if (!isValidDirection) return;
      const willSnakeEatSelf = getOppositeDirection(newDirection) === direction && snakeCells.size > 1;
      if (willSnakeEatSelf) return;
      setDirection(newDirection);
  }

  const handleFoodConsumption = () => {
    const maxFoodCellValue = BOARD_SIZE * BOARD_SIZE;
    let nextfoodCell: number;
    while (true) {
      nextfoodCell = randomIntFromRange(1, maxFoodCellValue);
      if (snakeCells.has(nextfoodCell) || foodCell === nextfoodCell) continue;
      break;
    }
    setScore((prev) => prev + 100);
    setFoodCell(nextfoodCell);
  };

  const isOutOfBounds = (coords: ICoords, board: number[][]) => {
    if (coords.row < 0 || coords.col < 0) return true;
    if (coords.row >= board.length || coords.col >= board[0].length)
      return true;
    return false;
  };

  function moveSnake() {
        const currentHeadCoords = {
            row: snake.head.val.row,
            col: snake.head.val.col,
          };
      
          const nextHeadCoords = getCoordsInDirection(currentHeadCoords, direction);
          if (isOutOfBounds(nextHeadCoords, board)){ handleGameOver(); return;}
          const nextHeadCell = board[nextHeadCoords.row][nextHeadCoords.col];
          if (snakeCells.has(nextHeadCell)){ handleGameOver(); return;}

          const newHead = new Node({
            row: nextHeadCoords.row,
            col: nextHeadCoords.col,
            cell: nextHeadCell,
          });

          const currentHead = snake.head;
          snake.head = newHead;
          currentHead.next = newHead;
      
          const newSnakeCells = new Set(snakeCells);
          newSnakeCells.delete(snake.tail.val.cell);
          newSnakeCells.add(nextHeadCell);


          if (snake.tail.next !== null) snake.tail = snake.tail.next;
          else snake.tail = snake.head;
          
          const foodConsumed = nextHeadCell === foodCell;
          if (foodConsumed) {
            handleFoodConsumption();
            growSnake(newSnakeCells);
          }else{
            setSnakeCells(newSnakeCells);
          }
  }

  const growSnake = (newSnakeCells : Set<number>) => {
    const growthCoords = getGrowthCoords(snake.tail, direction);
    if (isOutOfBounds(growthCoords, board)) {
      return;
    }
    const newTailCell = board[growthCoords.row][growthCoords.col];
    const newTailNode = new Node({
      row: growthCoords.row,
      col: growthCoords.col,
      cell: newTailCell,
    });
    
    const currTail = snake.tail;
    snake.tail = newTailNode;
    snake.tail.next = currTail;

    newSnakeCells.add(newTailCell);
    setSnakeCells(newSnakeCells);
  };

  const handleGameOver = () => {
    setIsGameOver(true);
  };

  return (
    <div>
      <div className="score">
        <h1>{!isGameOver ? `Score: ${score}` : "Game Over"}</h1>
      </div>
      <div className="board">
        {board.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((cellValue, cellIdx) => (
              <div
                key={cellIdx}
                className={`cell  
                            ${snakeCells.has(cellValue) ? "snake-cell" : ""}  
                            ${foodCell == cellValue ? "food-cell" : ""}`}
              >
                {cellValue}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={moveSnake}> move</button>
      </div>
    </div>
  );
};

const createBoard = (BOARD_SIZE: number) => {
  let count = 1;
  const board: number[][] = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    let currentRow: number[] = [];
    for (let cell = 0; cell < BOARD_SIZE; cell++) {
      currentRow.push(count++);
    }
    board.push(currentRow);
  }
  return board;
};

const getDirectionFromKey = (key: string) => {
  if (key == "w" || key == "W") return Direction.UP;
  if (key == "s" || key == "S") return Direction.DOWN;
  if (key == "d" || key == "D") return Direction.RIGHT;
  if (key == "a" || key == "A") return Direction.LEFT;
  return "";
};

const getCoordsInDirection = (coords: ICoords, direction: string) => {
  if (direction === Direction.UP) {
    return {
      row: coords.row - 1,
      col: coords.col,
    };
  }
  if (direction === Direction.DOWN) {
    return {
      row: coords.row + 1,
      col: coords.col,
    };
  }
  if (direction === Direction.LEFT) {
    return {
      row: coords.row,
      col: coords.col - 1,
    };
  }
  if (direction === Direction.RIGHT) {
    return {
      row: coords.row,
      col: coords.col + 1,
    };
  }
  return {
    row: coords.row,
    col: coords.col,
  };
};
const getNextNodeDirection = (node: Node, currDirection: string) => {
  if (node.next === null) return currDirection;
  const { row: currRow, col: currCol } = node.val;
  const { row: nextRow, col: nextCol } = node.next.val;

  if (currRow == nextRow && currCol + 1 === nextCol) {
    return Direction.RIGHT;
  }
  if (currRow == nextRow && currCol - 1 === nextCol) {
    return Direction.LEFT;
  }
  if (currRow + 1 == nextRow && currCol === nextCol) {
    return Direction.DOWN;
  }
  if (currRow - 1 == nextRow && currCol - 1 === nextCol) {
    return Direction.UP;
  }
  return currDirection;
};
const getGrowthCoords = (tail: Node, currDirection: string) => {
  const nextTailDirection = getNextNodeDirection(tail, currDirection);
  const growthDirection = getOppositeDirection(nextTailDirection);
  const growthNodeCoords = getNewNodeCoords(tail, growthDirection);
  return growthNodeCoords;
};
const getNewNodeCoords = (node: Node, growthDirection: string) => {
  const { row: currRow, col: currCol } = node.val;
  if (growthDirection === Direction.UP)
    return { row: currRow - 1, col: currCol };
  if (growthDirection === Direction.DOWN)
    return { row: currRow + 1, col: currCol };
  if (growthDirection === Direction.LEFT)
    return { row: currRow, col: currCol - 1 };
  if (growthDirection === Direction.RIGHT)
    return { row: currRow - 1, col: currCol + 1 };
  return { row: currRow, col: currCol };
};
const getOppositeDirection = (currDirection: string) => {
  if (currDirection === Direction.UP) return Direction.DOWN;
  if (currDirection === Direction.DOWN) return Direction.UP;
  if (currDirection === Direction.LEFT) return Direction.RIGHT;
  if (currDirection === Direction.RIGHT) return Direction.LEFT;
  return currDirection;
};
