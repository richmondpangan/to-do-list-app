import React, {useState} from 'react'

function TodoList() {
    const [tasks, setTasks] = useState(["Eat Breakfast", "Take a shower", "Walk the dog"]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    // Add a new task
    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    // Delete a task
    function deleteTask(index) {
        const udpatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(udpatedTasks);
    }

    // To check or uncheck a task
    function handleItemClick(event) {
        const listItem = event.currentTarget;
        if (event.target.tagName === 'LI') {
            listItem.classList.toggle('checked');
        }
    }

    return(
        <div className='container'>
            <div className='to-do-list'>
                <h1 className='label'>To-Do-List <img src="./src/assets/notebook-icon.png" alt="notebook-icon" className='notebook-icon-img' /></h1>
                <div className='row'>   
                    <input type="text" placeholder='Enter a task...' value={newTask} onChange={handleInputChange} className='task-input-field' />
                    <button className='add-button' onClick={addTask}>
                        Add
                    </button>
                </div>
                <ul>
                    {tasks.map((task, index) => <li key={index} onClick={handleItemClick}>
                        <span className='text'>{task}</span>
                        <button className='delete-button' onClick={() => deleteTask(index)}>
                            <img src="./src/assets/delete-button.png" alt="x" className='delete-button-img' />
                        </button>
                    </li>)}
                </ul>
            </div>
        </div>
    );
}

export default TodoList