import React from 'react';

const Item = ({task,removeTask,extendTask,editeTask})=>{

    return(
        <div className='w-full bg-gray-50 p-1 mb-0.5 border border-gray-300'>
            <div className='flex justify-end items-center px-3 space-x-2 '>
                <img src='images/extend.png'  onClick={()=>extendTask(task.id)} className='h-6 p-0.5  cursor-pointer rounded-full hover:shadow-md hover:bg-black hover:bg-opacity-20' alt="notify me" />
                <img src='images/notification.png'  className='h-6 p-0.5 cursor-pointer rounded-full hover:shadow-md hover:bg-black hover:bg-opacity-20' alt="notify me" />
                <img src="images/edit.png" onClick={()=>editeTask(task.id)} className='h-6 p-0.5 cursor-pointer rounded-full hover:shadow-md hover:bg-black hover:bg-opacity-20' alt="edit item" />
                <img src="images/delete.png" onClick={()=>removeTask(task.id)} className='h-6 p-0.5 cursor-pointer rounded-full hover:shadow-md hover:bg-black hover:bg-opacity-20' alt="delete item"/>
            </div>
            <div className="p-2">
                <p className='bg-white h-14 p-1 overflow-hidden rounded-md border border-gray-300 whitespace-pre-line'>
                    {task.task}
                </p>
            </div>
        </div>
    )
}
export default Item;