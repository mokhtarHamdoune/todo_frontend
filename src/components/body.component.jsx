import React from 'react';
import Item from './item.component';
import Form from './form.component';
const Body = ({tasks,addTask,removeTask,extendTask,editeTask,newTask,handleTaskChange})=>{


    return (
        <div className='flex flex-col-reverse md:flex-row'>
            <div className="w-full md:w-2/5">
                <h1 className='w-full  text-center text-4xl py-2 font-tasks border-b border-gray-300  text-gray-400'>Tasks</h1>
                <div className='p-0.5 bg-white  h-screen overflow-y-scroll todo-body'>
                    {
                        tasks.map(task=><Item key={task._id} task={task} removeTask={removeTask}  extendTask={extendTask} editeTask={editeTask}/>)
                    }
                </div>
            </div>
            <div className='w-full md:w-3/5 bg-gray-500 bg-form-bg'>
                <Form newTask={newTask}  addTask={addTask}  handleTaskChange={handleTaskChange} />
            </div>
        </div>
    )
}

export default Body;