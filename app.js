const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add('completed');
        }

        li.onclick = () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
        };

        const delBtn = document.createElement('button');
        delBtn.textContent = '✖';
        delBtn.onclick = (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
        };

        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

addBtn.onclick = () => {
    if (taskInput.value.trim() === '') return;

    tasks.push({
        text: taskInput.value,
        completed: false
    });

    taskInput.value = '';
    saveTasks();
};

renderTasks();
