import React from 'react'; import Header from './header.component';
import Body from './body.component';
import Modal from './modal.component';
import Loader from './loader.component';
const taskValidation= (val)=>{
    if(!val){
        return 'Task text is required';
    }
    if(val.trim().length < 10){
        return 'Task text should be  at least ten characters';
    }
    return null;
}
const dateValidation = (val)=> {
    if(!val){
        return 'Date is required';
    }
    if(val < new Date().toISOString().substring(0,10)){
        return 'Date must be great or equal to today';
    }
    return null;
}

const timeValidation= (val,date)=>{
    let today =  new Date();
    if(!val){
        return 'Time is required';
    }
    if(date === today.toISOString().substring(0,10) &&  val < today.toTimeString()){
        return "Time must be greater than today's time";
    }
    return null;
}
const validate = {
    task:taskValidation,
    date:dateValidation,
    time:timeValidation
}

const errors={
    task:'',
    date:'',
    time:''
}
const isvalide={
    taks:false,
    date:false,
    time:false
}
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
            loading:true
        }
        this.extededTask={
            task:'',
            date:'',
            time:''
        };
        this.addTask =  this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.extendTask = this.extendTask.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.editeTask =  this.editeTask.bind(this);
        this.handleTaskChange = this.handleTaskChange.bind(this);
        this.handleBlure = this.handleBlure.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTaskChange(event){
        const {name,value} = event.target;
        name === 'time' ? errors[name]=validate[name](value,this.state.newTask.date) : errors[name]=validate[name](value);
        isvalide[name]=errors[name]== null ? true:false;
        this.setState({newTask:{...this.state.newTask,[name]:value}});
    }
    
    handleBlure(event){
        const {name,value} = event.target;
        name === 'time' ? errors[name]=validate[name](value,this.state.newTask.date) : errors[name]=validate[name](value);
        isvalide[name]=errors[name]== null ? true:false;
        this.setState({newTask:{...this.state.newTask}});
    }
        
    handleSubmit(event){
        event.preventDefault();
        //check the errors for the last ime 
        let {task,date,time} = this.state.newTask;
        errors.task=validate.task(task);
        errors.date=validate.date(date);
        errors.time=validate.time(time,date);
        isvalide.task=errors.task==null ? true:false;
        isvalide.date=errors.date==null ? true:false;
        isvalide.time=errors.time==null ? true:false;
        //if there is an error just rerender
        if(isvalide.task && isvalide.date && isvalide.time){
            this.addTask();
        }else{
            this.setState({newTask:{...this.state.newTask}});
        }
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
                 errors={errors}
                 isvalide={isvalide}
                 handleTaskChange={this.handleTaskChange}
                 handleBlure={this.handleBlure}
                 handleSubmit={this.handleSubmit}
                 />
            </div>
        )
    }
}

export default Todo;
