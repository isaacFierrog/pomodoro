const d = document;
const ls = localStorage;
let tasks = [];

const readLocalStorage = () => {
    if(!ls.getItem('tasks')) return;

    tasks = JSON.parse(ls.getItem('tasks'));
    loadTasks(tasks);
};

const loadTasks = tasksList => {
    const $tasksList = d.querySelector('.tasks');
    const $fragment = d.createDocumentFragment();
    const $taskTemplate = d.getElementById('task-template').content;

    if($tasksList.children.length > 0){
        Array.from($tasksList.children).forEach(el => {
            $tasksList.removeChild(el);
        });
    }

    tasksList.forEach(task => {
        $taskTemplate.querySelector('.task__name').textContent = task;
        const $clone = d.importNode($taskTemplate, true);
        $fragment.appendChild($clone);
    });

    $tasksList.appendChild($fragment);
    // console.log($tasksList);
    // console.log($tasksList.children.length);
};

const addTask = newTask => {
    if(tasks.includes(newTask)) return; 
    tasks.push(newTask);
    ls.setItem('tasks', JSON.stringify(tasks));

    loadTasks(tasks);
};

const readTask = () => {
    d.addEventListener('submit', e => {
        e.preventDefault();
        const $form = e.target;
        const newTask = $form.task.value.trim();
        const formatTask = `${newTask.substring(0, 1).toUpperCase()}${newTask.substring(1)}`;

        $form.task.value = '';

        if(newTask.length > 0) addTask(formatTask);
        else console.log('No hay tarea para guardar');
    });
};

d.addEventListener('DOMContentLoaded', e => {
    readLocalStorage();
    readTask();
});