import React from 'react';
import Item from './item.component';
import Form from './form.component';
const Body = ({tasks,addTask,removeTask,extendTask,editeTask,changedTask})=>{


    return (
        <div className='flex'>
            <div className="w-2/5 ">
                <h1 className='w-full  text-center text-4xl py-2 font-tasks border-b border-gray-300  text-gray-400'>Tasks</h1>
                <div className='p-0.5 bg-white  h-screen overflow-y-scroll todo-body'>
                    {
                        tasks.map(task=><Item key={task.id} task={task} removeTask={removeTask}  extendTask={extendTask} editeTask={editeTask}/>)
                    }
                </div>
            </div>
            <div className='w-3/5 bg-gray-500 bg-form-bg'>
                <Form changedTask={changedTask} addTask={addTask} />
            </div>
        </div>
    )
}

export default Body;