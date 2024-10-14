import './ToDoList.css'
import { COMPLETED, PENDING } from '../ToDoContext';
import { useContext } from 'react';
import { ToDoContext } from '../ToDoContext';

function ToDoList({children}) {
    const { tab, setTab, loading, error, pending, completed } = useContext(ToDoContext);
    
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
                {!error && loading && <li><p>Cargando...</p></li>}
                {error && <li><p>Hubo un error :(</p></li>}
                {(!loading && !error && pending === 0 && tab === PENDING) && <li><p>¡Crea un ToDo!</p></li>}
                {(!loading && !error && completed === 0 && tab === COMPLETED) && <li><p>¡Completa tu primer ToDo!</p></li>}
                {children}
            </ul>
        </>
    );
}

export {ToDoList};