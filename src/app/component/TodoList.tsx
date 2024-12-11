'use client'
import React, { useState } from 'react'

export const TodoList:React.FC = () => {
    const[tasks, setTasks]=useState<string[]>([]);
    const[task, setTask]=useState<string>('')

    const addTask = ()=>{
        if(task.trim()!== ''){
            setTasks([...tasks, task]);
            setTask('');
        }
    };
    const removeTask = (indexToRemove:number)=>{
        setTasks(tasks.filter((_, index)=> index !== indexToRemove))
    }
  return (
    <div className='flex flex-col items-center bg-yellow-200 m-4 p-4'>
        <h1 className='text-xl text-gray-950'>To DO List</h1>
        <input 
            type='text'
            value={task}
            placeholder='Enter a task ...'
            onChange={(e)=>setTask(e.target.value)}
            className='border border-gray-600 rounded-lg m-2 p-2'
        />
        <button className='bg-green-500 rounded-xl m-2 p-2 text-white' onClick={addTask}>Add Task</button>
   <ul>
    {tasks.map((task,index)=>(
        <li key={index} className='list-disc'>
            {task}
            <button
                className='bg-red-500 text-white rounded-lg m-2 p-2 '
                onClick={(e)=>removeTask(index)}
            >
                delete
            </button>
        </li>
    ))}
   </ul>
   
    </div>
  )
}
