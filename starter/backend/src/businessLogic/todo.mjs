import { TodoAccess } from "../dataLayer/todoAccess.mjs";
import { createLogger } from "../utils/logger.mjs";
import * as uuid from 'uuid';

const logger = createLogger("TODOS Business Logic");
const todoAccess = new TodoAccess();

export async function getTodos(userId) {
    const todos = await todoAccess.getTodos(userId);

    return todos;
}

export async function createTodo(todo, userId) {
    const todoId = uuid.v4();
    const todoItem = {
        todoId: todoId,
        name: todo.name,
        userId,
        dueDate: todo.dueDate,
        createdAt: new Date().toISOString(),
        done: false,
        // attachmentUrl: `https://${process.env.ATTACHMENT_S3_BUCKET}.s3.amazonaws.com/${todoId}`,
        attachmentUrl: ``
    }
    logger.info('Request create new TODO: ', todoItem);

    return await todoAccess.createTodo(todoItem);
}

export async function updateTodo(updateRequest, userId, todoId) {
    const updateItem = {
        todoId,
        name: updateRequest.name,
        dueDate: updateRequest.dueDate,
        done: updateRequest.done,
        userId
    }
    logger.info('Request update TODO item: ', todoId);

    return await todoAccess.updateTodo(updateItem);
}

export async function deleteTodo(userId, todoId) {
    logger.info('Request delete TODO item: ', todoId);

    return await todoAccess.deleteTodo(userId, todoId);
}