document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const input = document.querySelector('input');
    const taskList = document.querySelector('.task-list');
    const progressBar = document.getElementById('progress');
    const progressNumber = document.getElementById('number');
    let tasks = [];
    let completedTasks = 0;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = input.value.trim();

        if (taskText !== "") {
            addTask(taskText);
            input.value = '';
        }
    });

    function addTask(taskText) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('animate__animated', 'animate__fadeInUp');
        taskItem.innerHTML = `${taskText} 
            <div class="task-actions">
                <i class="fas fa-check-circle complete"></i>
                <i class="fas fa-trash delete"></i>
            </div>`;
        
        taskItem.querySelector('.complete').addEventListener('click', () => {
            toggleComplete(taskItem);
        });

        taskItem.querySelector('.delete').addEventListener('click', () => {
            deleteTask(taskItem);
        });

        taskList.appendChild(taskItem);
        tasks.push(taskText);
        updateProgress();
    }

    function toggleComplete(taskItem) {
        if (!taskItem.classList.contains('completed')) {
            taskItem.classList.add('completed');
            completedTasks++;
        } else {
            taskItem.classList.remove('completed');
            completedTasks--;
        }
        updateProgress();
    }

    function deleteTask(taskItem) {
        if (taskItem.classList.contains('completed')) {
            completedTasks--;
        }
        tasks.splice(tasks.indexOf(taskItem.textContent.trim()), 1);
        taskItem.remove();
        updateProgress();
    }

    function updateProgress() {
        const totalTasks = tasks.length;
        if (totalTasks > 0) {
            const completedPercentage = (completedTasks / totalTasks) * 100;
            progressBar.style.width = `${completedPercentage}%`;
            progressNumber.textContent = `${completedTasks}/${totalTasks}`;
        } else {
            progressBar.style.width = '0%';
            progressNumber.textContent = '0/0';
        }
    }
});
