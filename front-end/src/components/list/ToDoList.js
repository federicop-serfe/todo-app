import './ToDoList.css'
import { COMPLETED, PENDING } from "../../redux/todos/constants";
import { useContext } from 'react';
import { ToDoContext } from '../ToDoContext';
import { ToDoItem } from './ToDoItem';
import { useSelector } from 'react-redux';
import { ERROR, LOADING, SUCCESS } from '../../redux/app/constants';

function ToDoList() {
    const { 
        doSearch,
        searchValue, 
        tab, 
        setTab, 
        pending, 
        completed,
        onDelete,
        onStateChange
    } = useContext(ToDoContext);
    const toDos = Object.values(useSelector(state => state.todos.list));
    const appStatus = useSelector(state => state.app.status);

    // Search 
    const preprocessText = rawText => {
        // Remove numbers and special, non printable characters, and spanish characters
        const regex = /[\W\dáéíóúÁÉÍÓÚñÑ\s]/g;
        return rawText.replace(regex, "").toLowerCase();
    }
    
    return (
        <>
            <div className = "tabs">
                <h2 
                    onClick = {() => setTab(PENDING)}
                    className = {tab === PENDING? "highlighted-tab":""}
                >Pendientes</h2>
                <h2
                    onClick = {() => setTab(COMPLETED)} 
                    className = {tab === COMPLETED? "highlighted-tab":""}   
                >Completadas</h2>
            </div>
            <ul className = "todos-box">
                {appStatus === LOADING && <li><p>Cargando...</p></li>}
                {appStatus === ERROR && <li><p>Hubo un error :(</p></li>}
                {(appStatus === SUCCESS && pending === 0 && tab === PENDING) && <li><p>¡Crea un ToDo!</p></li>}
                {(appStatus === SUCCESS && completed === 0 && tab === COMPLETED) && <li><p>¡Completa tu primer ToDo!</p></li>}
                {appStatus === SUCCESS && toDos
                    .filter(todo => todo.state === tab)
                    // If the user wants to search specific todos, filter todos; otherwise return the whole array
                    .filter(todo => doSearch? preprocessText(todo.text).includes(preprocessText(searchValue)): true)
                    .map(todo =>
                        <ToDoItem
                            key = {todo.id} // Needed by react
                            tab = {tab}
                            text = {todo.text}
                            onDelete = {() => onDelete(todo.id)}
                            onStateChange = {() => onStateChange(todo.id)}
                        ></ToDoItem>
                    )
                }
            </ul>
        </>
    );
}

export {ToDoList};