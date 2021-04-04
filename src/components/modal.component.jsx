import React from 'react';

function Modal ({task,modalIsOpen,toggle}){

    return (
        <div className={`absolute top-0 left-0 w-full h-full flex justify-center items-center ${modalIsOpen ? 'block':'hidden'} `} onClick={()=>toggle()}>
            <div className='w-4/6 sm:w-2/5 bg-white bg-opacity-80 shadow-md border border-gray-100 rounded-md  animate-modal'>
                <p className='h-56 p-4 overflow-y-scroll whitespace-pre-line'>
                    {task.task}
                </p>
                <div className='h-12 px-5  flex justify-end items-center text-md  border-t border-gray-200'>
                    <img src='images/calendar.png'  className='h-6 p-0.5' alt="calender" /> 
                    <span>{task.date}</span>
                    <img src='images/time_circle.png'  className='h-6 p-0.5' alt="calender" /> 
                    <span>{task.time}</span>
                </div>
            </div>
        </div>
    );
}

export default Modal;