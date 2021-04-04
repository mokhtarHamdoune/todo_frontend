import React from 'react';
import Header from './header.component';
import Body from './body.component';
import Modal from './modal.component';
class Todo  extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tasks:[],
            changedTask:{
                task:'',
                date:'',
                time:''
            },
            modalIsOpen:false
        }
        this.addTask =  this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.extendTask = this.extendTask.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.editeTask =  this.editeTask.bind(this);
    }
    addTask(task){
        task.id=this.state.tasks.length
        this.setState({tasks:[task,...this.state.tasks]})
    }

    removeTask(id){
       this.setState({tasks:this.state.tasks.filter(task=>task.id!==id)});
    }

    editeTask(id){
        console.log(id)
        this.setState({changedTask:this.state.tasks.find((task)=>task.id===id)});
    }

    extendTask(id){
        console.log(id)
        this.setState({changedTask:this.state.tasks.find((task)=>task.id===id)});
        this.toggleModal()
    }

    toggleModal(){
        this.setState({modalIsOpen:!this.state.modalIsOpen})
    }


    render(){
        const {tasks,changedTask,modalIsOpen} = this.state;
        return (
            <div className='w-full'>
                <Modal task={changedTask} modalIsOpen={modalIsOpen} toggle={this.toggleModal} />
                <Header />
                <Body tasks={tasks}
                 addTask={this.addTask} 
                 removeTask={this.removeTask}
                 extendTask={this.extendTask}
                 editeTask={this.editeTask}
                 changedTask={changedTask}
                 />
            </div>
        )
    }
}

export default Todo;
