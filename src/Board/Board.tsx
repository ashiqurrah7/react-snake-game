import React, { useState } from 'react'
import './board.css'

const BOARD_SIZE = 10;

export const Board = () => {

    const [board, setboard] = useState(
        new Array(BOARD_SIZE).fill(0).map(row  => new Array(BOARD_SIZE).fill(0)),
    );

    return (
        <div className="board">
            {
                board.map((row, rowIdx) => 
                    <div key={rowIdx} className="row">
                        {row.map((cellIdx) => 
                            <div key={cellIdx} className="cell"></div>
                        )
                        }
                    </div>
                )
            }
        </div>
    )
}
