import React from'react';


function Form({newTask,errors,isvalide,handleTaskChange,handleSubmit,handleBlure}){
    
    const {task,date,time} = newTask;
    return(
        <form className='w-full px-2 md:px-8 py-2'  onSubmit={handleSubmit}>
            <h1 className='text-yellow-300 text-5xl text-center py-2 mb-12 font-new-task '>Create New Task</h1>
            <div>
                <label htmlFor='task' className='block text-lg text-gray-600 font-bold' >Task's text *</label>
                <textarea name='task' id='task' value={task} onChange={handleTaskChange} onBlur ={handleBlure}  className='w-full resize-none  outline-none p-1 h-48 shadow-md border border-gray-200 focus:ring-2 focus:ring-yellow-400' ></textarea>
                <p className='text-sm text-red-400 h-2'>{isvalide.task || errors.task}</p>
            </div>
            <div className="mt-4  flex flex-col md:flex-row justify-between  ">
                <div className='w-full md:w-2/5'>
                    <label htmlFor='date' className='block text-lg text-gray-600 font-bold' >Remind me on *</label>
                    <input type="date" name="date" id="date" value={date} onChange={handleTaskChange}  onBlur ={handleBlure}  className='p-2 w-full  outline-none shadow-md border border-gray-200 focus:ring-2 focus:ring-yellow-400'  />
                    <p className='text-sm text-red-400 h-2'>{isvalide.date || errors.date}</p>
                </div>
                <div className='w-full mt-1 md:mt-0 md:w-2/5'>
                    <label htmlFor='time' className='block text-lg text-gray-600 font-bold'>At *</label>
                    <input type="time" name="time" id="time" value={time} onChange={handleTaskChange} onBlur ={handleBlure}  className='p-2 w-full  outline-none shadow-md border border-gray-200 focus:ring-2 focus:ring-yellow-400' />
                    <p className='text-sm text-red-400 h-2'>{isvalide.time || errors.time}</p>
                </div>
            </div>
            <button type='submit' className='py-2 px-8 my-8 bg-yellow-300 text-xl text-white rounded shadow-xl hover:bg-yellow-400 float-right'>CREATE</button>
        </form>
    );
}

export default Form;