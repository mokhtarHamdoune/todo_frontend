import React,{Component} from'react';
class Form extends Component{

    constructor(props){
        super(props);
        this.state={
            task:'',
            date:'',
            time:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        const {name,value} =event.target;
        this.setState({[name]:value})
    }
    
    handleSubmit(event){
        event.preventDefault();
        this.props.addTask(this.state);
        this.setState({
            task:'',
            date:'',
            time:''
        });
    }

    render(){
        const {task,date,time} = this.state;
        return (
            <form className='w-full px-8 py-2'  onSubmit={this.handleSubmit}>
                <h1 className='text-yellow-300 text-5xl text-center py-2 mb-12 font-new-task '>Create New Task</h1>
                <label htmlFor='task' className='block text-xl text-black font-bold' >Task's text *</label>
                <textarea name='task' id='task' value={task} onChange={this.handleChange} className='w-full resize-none  outline-none p-1 h-48 shadow-md border border-gray-200 focus:ring-2 focus:ring-yellow-400'></textarea>
                <div className="mt-6 flex justify-between">
                    <div className='w-2/5'>
                        <label htmlFor='date' className='block text-xl text-black font-bold' >Notify me *</label>
                        <input type="date" name="date" id="date" value={date} onChange={this.handleChange} className='p-2 w-full  outline-none shadow-md border border-gray-200 focus:ring-2 focus:ring-yellow-400' />
                    </div>
                    <div className='w-2/5'>
                        <label htmlFor='time' className='block text-xl text-black font-bold'>At</label>
                        <input type="time" name="time" id="time" value={time} onChange={this.handleChange}  className='p-2 w-full  outline-none shadow-md border border-gray-200 focus:ring-2 focus:ring-yellow-400' />
                    </div>
                </div>
                <button type='submit' className='py-2 px-8 mt-10 bg-yellow-300 text-xl text-white rounded shadow-xl hover:bg-yellow-400 float-right'>CREATE</button>
            </form>
        );
    }
}

export default Form;