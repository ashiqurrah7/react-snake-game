import { useRef, useEffect } from "react";

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
