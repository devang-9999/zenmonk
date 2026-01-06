import { useEffect, useState } from 'react'
import './App.css'

function App() {
  //const [tasks, setTasks] = useState([])
  //USE OF LOCAL STORAGE AS WE WANT TO DO NOT LET THE DATA TO BE LOST AFTER REFRESH ...AND WE ARE NOT USING PREVENT DEFAULT AS IT CAN ONLY USED WITH FORMS
  const [tasks, setTasks] = useState(() => {
    const SavedTasks = localStorage.getItem('tasks');
    return SavedTasks ? JSON.parse(SavedTasks) : [];
  })

  //as local storage is executed only once at astart of page we have to use useeffect
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks])
  const [text, settext] = useState('');

  const handleTextChange = (event) => {
    // console.log(event.target.value)
    settext(event.target.value);
  };
  const addTask = () => {
    if (text.trim() === '') {
      return
    }
    setTasks([...tasks, text]);
    settext('');
    console.log(tasks)
  }

  const [deleted, setDelete] = useState(() => {
    const DeletedTasks = localStorage.getItem('deleted');
    return DeletedTasks ? JSON.parse(DeletedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('deleted', JSON.stringify(deleted)), [deleted]
  })

  const deleteTask = (indexOfDeletion) => {
    const updatedTasks = tasks.filter((tasks, index) => index !== indexOfDeletion)
    setTasks(updatedTasks)
    const tasksDeleted = tasks[indexOfDeletion];
    setDelete([...deleted, tasksDeleted])
  }
   const restoreTask = (indexRestore) => {
    console.log(indexRestore, "index to restore")
    const taskToBeRestored = deleted[indexRestore];
    console.log(taskToBeRestored, "vgcuftu")
    const deleted = tasks.filter((tasks, index) => index !== indexRestore)
    console.log(deleted)
    // setTasks([...tasks, taskToBeRestored])
    // console.log(tasks)

  }


  return (
    <>
      <div className='container'>
        <div>
          <h1>TODO LIST</h1>
        </div>
        <div>
          <input
            className='addTask'
            type="text"
            onChange={handleTextChange}
            value={text}
            placeholder='Enter task' />
          <button onClick={addTask}  >Add</button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <div className='divOfTask'>{task}</div>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>

        <div>
          <h2>Deleted Tasks</h2>

          <ul>
            {deleted.map((task, index) => (
              <li key={index} >
                <div className="divOfTask">{task}</div>
                <button onClick={() => restoreTask(index)}>Restore</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>

  )
}

export default App