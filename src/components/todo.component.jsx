import React from 'react';
import Header from './header.component';
import Body from './body.component';
import Modal from './modal.component';
class Todo  extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tasks:[],
            newTask:{
                task:'',
                date:'',
                time:''
            },
            modalIsOpen:false
        }
        this.extededTask={
            task:'',
            date:'',
            time:''
        };
        this.handleTaskChange = this.handleTaskChange.bind(this);
        this.addTask =  this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.extendTask = this.extendTask.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.editeTask =  this.editeTask.bind(this);
    }

    handleTaskChange(name,value){
        this.setState({newTask:{...this.state.newTask,[name]:value}});
    }

    addTask(){
        const newTask = {...this.state.newTask};
        newTask.id=this.state.tasks.length
        this.setState({
        tasks:[newTask,...this.state.tasks],
        newTask:{task:'',
            date:'',
            time:''
        }
    })
    }

    removeTask(id){
       this.setState({tasks:this.state.tasks.filter(task=>task.id!==id)});
    }

    editeTask(id){
        this.setState({newTask:this.state.tasks.find(task=>task.id === id)});
        this.removeTask(id);
    }

    extendTask(id){
        this.extededTask={...this.state.tasks.find((task)=>task.id===id)}
        this.toggleModal()
    }

    toggleModal(){
        this.setState({modalIsOpen:!this.state.modalIsOpen})
    }


    render(){
        const {tasks,modalIsOpen,newTask} = this.state;
        return (
            <div className='w-full'>
                <Modal task={this.extededTask} modalIsOpen={modalIsOpen} toggle={this.toggleModal} />
                <Header />
                <Body tasks={tasks}
                 addTask={this.addTask} 
                 removeTask={this.removeTask}
                 extendTask={this.extendTask}
                 editeTask={this.editeTask}
                 newTask={newTask}
                 handleTaskChange={this.handleTaskChange}
                 />
            </div>
        )
    }
}

export default Todo;
