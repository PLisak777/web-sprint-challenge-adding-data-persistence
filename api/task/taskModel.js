const knex = require('knex')
const config = require('../../knexfile')
const db = knex(config.development)

const getTasks = async () => {
    try {
        const tasks = await db('projects')
            .join('tasks', 'tasks.projectId', 'projects.id')
            .select('projects.name as projectName', 'tasks.description as taskDescription')
            return tasks
    } catch (err) {
        console.log(err)
        throw err
    }
}

const addTask = async (task) => {
    try {
        const newTask = await db('tasks')
            .insert(task)
            return newTask
    } catch (err) {
        console.log(err)
        throw err
    }
}

module.exports = {
    getTasks, 
    addTask
}