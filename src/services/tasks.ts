interface Task {
    id:string,
    name:string,
    description:string,
    temporality:string
}

let tasks:Task[] = []

function create(task:Task) {
    tasks = [task, ...tasks]
    console.log('tasks', task)
}