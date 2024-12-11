'use client'
import { clear } from 'console';
import React, { useState } from 'react';

export const TimeruseState = () => {
    const[count, setCount]=useState<number>(0);
    const[running, setRunning]=useState<boolean>(false);
    const[timerId, setTimerId]=useState<number | null>(null);

    const startTimer =()=>{
        if(!running){
            const id = window.setInterval(()=>{
                setCount(prevCount =>prevCount+1);
            },1000);
            setTimerId(id);
            setRunning(true);
        }
    };
    const stopTimer =()=>{
        if(running && timerId !== null){
            clearInterval(timerId);
            setTimerId(null);
            setRunning(false);
        }
    };
    const resetTimer =()=>{
        setCount(0);
        stopTimer();
    }
  return (
    <div className='flex bg-blue-100 rounded-lg m-4 p-4'>
        <p>Timer is {count}</p>
        <button className='bg-green-500 rounded-lg m-2 p-2 text-white' onClick={startTimer}>Start Timer</button>
        <button className='bg-red-500 rounded-lg m-2 p-2 text-white' onClick={stopTimer}>Stop Timer</button>
        <button className='bg-blue-500 rounded-lg m-2 p-2 ' onClick={resetTimer}>Reset Timer</button>
    </div>
  )
}
