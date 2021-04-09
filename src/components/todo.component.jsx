import React from 'react'; import Header from './header.component';
import Body from './body.component';
import Modal from './modal.component';
import Loader from './loader.component';
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
            modalIsOpen:false,
            loading:false
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
        this.setState({loading:true});
        fetch("http://localhost:5000/api/tasks",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state.newTask),
           // mode:'same-origin'
        }).then(response=>{
            if(response.ok){
                return response.json();
            }
            throw new Error('Somthing went rong status :'+response.status+' status text: '+response.statusText);
        },error=>{
            return  new Error(error.errorMessage);
        }).then(lastTask=>{
            this.setState({
                tasks:[...this.state.tasks,lastTask],
                newTask:{task:'',
                    date:'',
                    time:''
                },
                loading:false
            })
        })
        .catch(error=>console.log(error));
    }

    removeTask(id){
        // this.setState({tasks:this.state.tasks.filter(task=>task._id!==id)});
        this.setState({loading:true});
        fetch("http://localhost:5000/api/tasks",{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({task_id:id}),
        })
        .then(response=>{
            if(response.ok){
                return response.json();
            }
            throw new Error ('Somthing went rong status :'+response.status+' status text: '+response.statusText);
        },error=>{
            throw new Error(error.errorMessage);
        }).then(deletedTask=>{
            this.setState({
                tasks:this.state.tasks.filter(task=>task._id!==deletedTask.id),
                loading:false
            })
        }).catch(error=>console.log(error)); 
    }

    editeTask(id){
        this.setState({newTask:this.state.tasks.find(task=>task._id === id)});
        this.removeTask(id);
    }

    extendTask(id){
        this.extededTask={...this.state.tasks.find((task)=>task._id===id)}
        this.toggleModal()
    }

    toggleModal(){
        this.setState({modalIsOpen:!this.state.modalIsOpen})
    }

    componentDidMount(){
        fetch("http://localhost:5000/api/tasks")
        .then(response=>{
            if(response.ok){
                return response.json();
            }
            throw new Error('somthing went wrong status: '+response.status+ ' status text: '+response.statusText);
        },error=>{
            throw new Error(error.errorMessage);
        }).then(data=>{
            this.setState({tasks:[...data],loading:false});
        })
        .catch(error=>console.log(error));
    }


    render(){
        const {tasks,modalIsOpen,newTask,loading} = this.state;
        return (
            <div className='w-full'>
                {
                    loading ? <Loader /> : ''
                }
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
