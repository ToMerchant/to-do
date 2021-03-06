
import { newProjectButton } from './dom.js';
import { renderTasks } from './tasks.js';
import { renderProjects, createProject } from './projects.js';


class Task {
    constructor(title, notes, checked, priority, date, select) {
        this.title = title;
        this.notes = notes;
        this.checked = checked;
        this.priority = priority;
        this.date = date;
        this.select = select;
    }
};

class Project {
    constructor(title, id) {
        this.title = title;
        this.tasksArray = [];
        this.id = id;

    }
    newTask(title, notes, checked, priority, date, select) {
        let newTask = new Task(title, notes, checked, priority, date, select)
        this.tasksArray.push(newTask)
    }

};

let projectTitleList = [];

let projectsArray = 'using this var only to avoid error';

let setProjects = (function () {
    if (localStorage.getItem('projects') === null) {
        projectsArray = [];

    }
    else if (localStorage.getItem('projects') !== null) {
        let stringprojectsArray = localStorage.getItem('projects');
        let parsedprojectsArray = JSON.parse(stringprojectsArray);
        projectsArray = parsedprojectsArray;
        projectsArray.forEach(element => {
            projectTitleList.push(element.title);
        })
    }
})();

function addProjectsToStorage() {
    let jsonprojectsArray = JSON.stringify(projectsArray);
    localStorage.setItem('projects', jsonprojectsArray);
};

let currentProject = '';

let setCurrentProject = function () {
    if (projectsArray.length > 0) {
        currentProject = projectsArray[0];
        renderTasks(currentProject.tasksArray);
    }
    else { currentProject = '' };
}
setCurrentProject();

let initialProject = function () {
    let defaultProject = new Project('General', 'General');
    projectsArray.push(defaultProject);
    projectTitleList.push(defaultProject.title);
    currentProject = defaultProject;
    renderProjects(projectTitleList);
    renderTasks(currentProject.tasksArray);
    addProjectsToStorage()
};

let checkProjectsArrayLength = function () {
    if (projectsArray.length === 0) {
        initialProject();
    }
};
checkProjectsArrayLength();

renderProjects(projectTitleList);

let submitProjectForm = () => {
    newProjectButton.style.display = 'inline';
    newTaskButton.style.display = 'inline';

    let x = new Project(titleInput.value.toString(), titleInput.value.toString());
    projectsArray.push(x);
    projectTitleList.push(x.title)
    currentProject = x;
    renderProjects(projectTitleList);
    newProjectForm.remove();
    renderTasks(currentProject.tasksArray);

    addProjectsToStorage();

};

let runNewTask = function () {
    if (projectsArray.length < 1) {
        alert('You must create a new project before you submit a new task.');
        renderTasks(currentProject.tasksArray);
        newTaskForm.remove();
    }
    else {
        let newTaskZ = new Task((titleInput.value.toString()), (notesArea.value), (false), (setPriority.value), (setDate.value), (false))
        currentProject.tasksArray.push(newTaskZ)

        renderTasks(currentProject.tasksArray);
        newTaskForm.remove();
    }
}

let checkTaskForm = function () {
    if (titleInput.value.length < 1) {
        alert('You must enter a Title.');

        renderTasks(currentProject.tasksArray);
        newTaskForm.remove();

    }
    else {
        runNewTask();
    }
}

let submitTaskForm = () => {
    newProjectButton.style.display = 'inline';
    newTaskButton.style.display = 'inline';

    checkTaskForm();
};


let switchProject = (divId) => {

    projectsArray.forEach(element => {
        if (divId === element.id) {
            currentProject = element;
            renderTasks(element.tasksArray)


        }
    })
    renderProjects(projectTitleList);
};




export { Task, Project, submitTaskForm, submitProjectForm, addProjectsToStorage, currentProject, switchProject, projectsArray, projectTitleList }


