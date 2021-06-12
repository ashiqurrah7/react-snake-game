import React, { useState } from 'react'
import './board.css'

const BOARD_SIZE: number = 10;

class Node{
    val: number;
    next: Node | null;

    constructor(val:number){
        this.val = val;
        this.next = null;
    }
}

class LinkedList{
    head: Node;
    tail: Node;
    constructor(val:number){
        const node = new Node(val);
        this.head = node;
        this.tail = node;
    }
}

export const Board = () => {

    const [board, setboard] = useState(createBoard(BOARD_SIZE));
    const [snakeCells, setSnakeCells] = useState(new Set([51]));
    const [snake, setSnake] = useState(new LinkedList(51));

    return (
        <div className="board">
            {
                board.map((row, rowIdx) => 
                    <div key={rowIdx} className="row">
                        {row.map((cellValue,cellIdx) => 
                            <div key={cellIdx} className={`cell  ${snakeCells.has(cellValue)? 'snake-cell' : ''}`}>
                                {cellValue}
                            </div>
                        )
                        }
                    </div>
                )
            }
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
