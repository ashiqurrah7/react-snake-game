import React, { useState, useEffect, useRef } from 'react'
import './board.css'

const BOARD_SIZE: number = 10;

interface IVal{
    row : number,
    col :number,
    cell: number,
}

interface ICoords{
    row:number,
    col:number
}

class Node{
    val : IVal;
    next: Node | null;

    constructor(val : IVal){
        this.val = val;
        this.next = null;
    }
}

class LinkedList{
    head: Node;
    tail: Node;
    constructor(val: IVal){
        const node = new Node(val);
        this.head = node;
        this.tail = node;
    }
}


enum Direction {
    UP = 'UP',
    DOWN = 'DOWN',
    RIGHT = 'RIGHT',
    LEFT = 'LEFT'
}

export const Board = () => {

    const [board, setboard] = useState(createBoard(BOARD_SIZE));
    const [snakeCells, setSnakeCells] = useState(new Set([51]));
    const [snake, setSnake] = useState(new LinkedList({row: 5, col :0, cell: 51}));
    const [direction, setDirection]  = useState <string>(Direction.RIGHT);
    const [foodCell, setFoodCell] = useState(snake.head.val.cell + 5);
    const [score, setScore] = useState(0);

    useEffect(() =>{
        window.addEventListener('keydown', e =>{
            const newDirection = getDirectionFromKey(e.key);
            const isValidDirection = newDirection !== '';
            if(isValidDirection) setDirection(newDirection);
        })
    },[]);

    const handleFoodConsumption = () => {
        const maxFoodCellValue = BOARD_SIZE * BOARD_SIZE;
        let nextfoodCell: number;
        while(true){
            nextfoodCell = randomIntFromRange(1, maxFoodCellValue)
            if(snakeCells.has(nextfoodCell) || foodCell ===nextfoodCell) continue;
            break;
        }
        setScore((prev)=> prev+100);
        setFoodCell(nextfoodCell);
    }

    function moveSnake(){
        const currentHeadCoords = {
            row : snake.head.val.row,
            col : snake.head.val.col,
        };
        console.log(direction);

        const nextHeadCoords = getCoordsInDirection(currentHeadCoords, direction);
        const nextHeadCell = board[nextHeadCoords.row][nextHeadCoords.col];
        const newHead = new Node(
            {
                row: nextHeadCoords.row,
                col: nextHeadCoords.col,
                cell:nextHeadCell
            }
            );
        const currentHead = snake.head;
        snake.head = newHead;
        currentHead.next = newHead;

        const newSnakeCells = new Set(snakeCells);
        newSnakeCells.delete(snake.tail.val.cell);
        newSnakeCells.add(nextHeadCell);
    
        if(snake.tail.next !== null) snake.tail = snake.tail.next;
        else snake.tail = snake.head;
        
        const foodConsumed = nextHeadCell === foodCell;
        if (foodConsumed) handleFoodConsumption();
        

        setSnakeCells(newSnakeCells);
    }

    return (
        <div>
            <div className="score">
                <h1>Score: {score}</h1>
            </div>
            <div className="board">
            {
                board.map((row, rowIdx) => 
                    <div key={rowIdx} className="row">
                        {row.map((cellValue,cellIdx) => 
                            <div key={cellIdx} className={`cell  
                            ${snakeCells.has(cellValue)? 'snake-cell' : ''}  
                            ${foodCell == cellValue? 'food-cell' : ''}`}>
                                {cellValue}
                            </div>
                        )
                        }
                    </div>
                )
            }
        </div>
            <div className="buttons">
                <button onClick={moveSnake} > move</button>
                </div>
        </div>
    )
}

const createBoard = (BOARD_SIZE: number) => {
    let count = 1;
    const board: number[][] = [];
    for(let row=0; row<BOARD_SIZE; row++){
        let currentRow:number[] = []
        for (let cell=0; cell<BOARD_SIZE; cell++){
            currentRow.push(count++);
        }
        board.push(currentRow);
    }
    return board;
}

const getDirectionFromKey = (key: string) => {
    if(key == 'w' || key == 'W') return Direction.UP;
    if(key == 's' || key== 'S') return Direction.DOWN;
    if(key == 'd' || key == 'D') return Direction.RIGHT;
    if(key == 'a' || key == 'A') return Direction.LEFT;
    return '';
}

const getCoordsInDirection = (coords :ICoords, direction : string) =>{
    if(direction === Direction.UP ){
        return {
            row : coords.row-1,
            col : coords.col
        }
    }
    if(direction === Direction.DOWN ){
        return {
            row : coords.row+1,
            col : coords.col
        }
    }
    if(direction === Direction.LEFT ){
        return {
            row : coords.row,
            col : coords.col-1
        }
    }
    if(direction === Direction.RIGHT ){
        return {
            row : coords.row,
            col : coords.col+1
        }
    }
    return {
        row : coords.row,
        col : coords.col
    };
};

const randomIntFromRange = (min: number, max:number)=>{
    return Math.floor(Math.random() * (max - min + 1) +min);
}