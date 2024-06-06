export interface Task {
    id:number,
    name:string,
    description:string,
    temporality:string
}

let tasks:Task[] = []
const STORAGE_KEY:string = "tasks-vue-compo-api"

function create(task:Task) {
    // if (tasks === null ) {
    //     tasks = []
    // }
    tasks = [task, ...tasks]
    console.log('tasks', tasks)
    saveTasks()
}

function read():Task[] {
    tasks = retrieveTasks();
    return tasks;
}

function deleteTask(id:number):void {
    tasks = tasks.filter(task => task.id !== id)
    saveTasks()
}

function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

function retrieveTasks():Task[] {
    const fromLocalStorage:string = localStorage.getItem(STORAGE_KEY) as string
    return JSON.parse(fromLocalStorage)
}

function convertCase (temporality:string):string {
    let result:string;
    switch (temporality) {
        case 'short-term':
            result = "Court terme"
            break;
        case 'medium-term':
            result = "Moyen terme"
            break;
        case 'long-term':
            result = "Long terme"
            break;
        default:
            result = "Erreur"
            break;
    }
    return result
}

export default {
    create, read, convertCase, deleteTask
}