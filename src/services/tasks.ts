export interface Task {
    id:number,
    name:string,
    description:string,
    temporality:string
}

let tasks:Task[] = []

function create(task:Task) {
    tasks = [task, ...tasks]
    console.log('tasks', tasks)
}

function read() {
    return tasks;
}

export default {
    create, read
}