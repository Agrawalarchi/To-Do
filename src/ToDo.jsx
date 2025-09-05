import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import EditCalendarSharpIcon from '@mui/icons-material/EditCalendarSharp';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskIcon from '@mui/icons-material/Task';
import './ToDo.css';

export default function ToDo() {
    const [ToDo, setToDo] = useState([]);
    const [newToDo, setNewTodo] = useState("");

   const addTask = () => {
    const trimmed = newToDo.trim();
    if (!trimmed) return;

    const isDuplicate = ToDo.some(
        (todo) => todo.task.toLowerCase() === trimmed.toLowerCase()
    );

    if (isDuplicate) {
        alert("Task already exists!");
        setNewTodo("");
        return;
    }

    const newItem = {
        id: uuidv4(),
        task: trimmed,
        isDone: false,
    };

    setToDo([...ToDo, newItem]);
    setNewTodo("");
};

    const deleteTodo = (id) => {
        setToDo(ToDo.filter(todo => todo.id !== id));
    };
 
    const deleteAll=()=>{
    const confirmDelete = window.confirm("Are you sure you want to delete all tasks?");
        if (confirmDelete) {
            setToDo([]);
        }
    }

    const markTodoDone = (id) => {
        setToDo(prevToDo =>
            prevToDo.map(todo =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    };

    const markAllDone = () => {
        setToDo(ToDo.map(todo => ({ ...todo, isDone: !todo.isDone })));
    };

    const uppercaseTask = (id) => {
        setToDo(prevToDo =>
            prevToDo.map(todo =>
                todo.id === id ? { ...todo, task: todo.task.toUpperCase() } : todo
            )
        );
    };
   const uppercaseAllTasks = () => {
        setToDo(ToDo.map(todo => ({ ...todo, task: todo.task.toUpperCase() })));
    };

    return (
        <div className="ToDo-container">
           
            <h2 className="todo-title">
                ToDo List <EditCalendarSharpIcon />
            </h2>

            <div className="inputBox">
                <input
                    placeholder="Add task"
                    value={newToDo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            addTask();
                        }
                    }}
                />
                <button onClick={addTask}>Add</button>
            </div>

            <div className="task">
                <h3 className="task-heading">
                    Task ToDo <ModeEditOutlineOutlinedIcon />
                </h3>

                {ToDo.length === 0 ? (
                    <div className="empty-message">
                        No tasks yet. Please add one!
                    </div>
                ) : (
                  <>
                   <ul className="task-list">
                        {ToDo.map(todo => (
                            <li key={todo.id} >
                               <div className="todo-item">
                                 <span
                                    className="task-text"
                                    style={todo.isDone ? { textDecoration: "line-through" } : {}}
                                >
                                    {todo.task}
                                </span>
                                <div className="icon-buttons">
                                    <button onClick={() => deleteTodo(todo.id)} className="icon-button" aria-label="Delete Task" >
                                        <ClearOutlinedIcon className="icon" />
                                    </button>

                                    <button onClick={() => uppercaseTask(todo.id)} className="icon-button"  aria-label="Uppercase Task">
                                        <FontDownloadIcon className="icon"/>
                                    </button>

                                    <button onClick={() => markTodoDone(todo.id)}  className="icon-button" aria-label="Mark Done" >
                                        <AssignmentTurnedInIcon  className="icon"/>
                                    </button>

                                </div>
                               </div>
                            </li>
                        ))}
                    </ul>

                 <div className="updateAllButtons">
                    <button  className="updateAllButton" onClick={deleteAll}  aria-label="Delete all tasks">
                         <DeleteIcon/>
                    </button>
    
                    <button  className="updateAllButton" onClick={uppercaseAllTasks} aria-label="UpperCase all tasks">
                       <TextFieldsIcon/>
                    </button>
    
                    <button className="updateAllButton" onClick={markAllDone} aria-label="MarkDone all tasks">
                       <TaskIcon/>
                    </button>
                    
                 </div>
                  </> 
                )}
            </div>
        </div>
    );
}
