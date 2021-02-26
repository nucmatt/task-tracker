import { useState, useEffect } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  // Fetch saved tasks on page load
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
  }, []);

// Fetch tasks
const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks');
  const data = await res.json();

  return data
};

// Add Task
const addTask = (task) => {
  const id = Math.floor(Math.random() * 10000 + 1);
  const newTask = { id, ...task };
  setTasks([...tasks, newTask]);
}

// Delete Task
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE'
  })
  // filter tasks to exclude the deleted task via it's id(passed in from Task component onClick event)
  setTasks(tasks.filter((task) => task.id !== id))
}

// Toggle Reminder
const toggleReminder =(id) => {
  setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder} : task))
}
  return (
    <div className="container">
     <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
     {/* double ampersand is a shortform ternary operator if there is no 'else' to the ternary if*/}
     {showAddTask && <AddTask onAdd={addTask} />}
     {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks'}
    </div>
  );
}

export default App;
