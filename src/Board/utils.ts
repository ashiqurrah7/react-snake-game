import { useRef, useEffect } from "react";

export class Node {
    val: IVal;
    next: Node | null;
  
    constructor(val: IVal) {
      this.val = val;
      this.next = null;
    }
  }

interface IVal {
    row: number;
    col: number;
    cell: number;
}

export interface ICoords {
    row: number;
    col: number;
}

export class LinkedList {
    head: Node;
    tail: Node;
    constructor(val: IVal) {
      const node = new Node(val);
      this.head = node;
      this.tail = node;
    }
}
  
export enum Direction {
    UP = "UP",
    DOWN = "DOWN",
    RIGHT = "RIGHT",
    LEFT = "LEFT",
}  

export function randomIntFromRange (min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };


export function useInterval(callback : Function, delay : number){
    const savedCallback = useRef<Function>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(()=>{
        function tick(){
            if(savedCallback.current) savedCallback.current();
        }
        if (delay !== null){
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    },[delay]);
}

export function reverseLinkedList(head: Node){
    let prevNode = null;
    let currNode = head;
    while(currNode !== null){
        const nextNode = currNode.next;
        currNode.next = prevNode;
        prevNode = currNode;
        currNode = nextNode!;
    }
    return prevNode;
}