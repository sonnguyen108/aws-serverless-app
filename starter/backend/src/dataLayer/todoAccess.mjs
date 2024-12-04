
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import AWSXRay from 'aws-xray-sdk-core';
import { createLogger } from '../utils/logger.mjs';

const logger = createLogger('TODO Data Layer');

export class TodoAccess {
    constructor() {
        this.database = DynamoDBDocument.from(
            AWSXRay.captureAWSv3Client(new DynamoDB())
        );
        this.tableTodos = process.env.TODOS_TABLE;
        this.index = process.env.TODOS_CREATED_AT_INDEX;
    }

    async getTodos(userId) {
        logger.info('Query all TODOS by userId: ', userId);
        const items = await this.database.query(
            {
                TableName: this.tableTodos,
                IndexName: this.index,
                KeyConditionExpression: 'userId = :userId',
                ExpressionAttributeValues: {
                    ':userId': userId
                }
            }
        );
        console.log(userId);
        console.log(items);

        return items.Items;
    }

    async createTodo(todo) {
        logger.info('Create new TODO item');

        await this.database.put(
            {
                TableName: this.tableTodos,
                Item: todo
            }
        );

        logger.info('Created new TODO: ', todo);
        return todo;
    }

    async updateTodo(updatedTodo) {
        logger.info('Update TODO item: ', updatedTodo);

        return await this.database.update(
            {
                TableName: this.tableTodos,
                Key: {
                    userId: updatedTodo.userId,
                    todoId: updatedTodo.todoId
                },
                UpdateExpression: 'set #name = :name, #dueDate = :dueDate, #done = :done',
                ExpressionAttributeNames: {
                    '#name': 'name'
                }
            }
        )
    }

    async deleteTodo(userId, todoId) {
        logger.info('Delete TODO item: ', todoId);

        return await this.database.delete(
            {
                TableName: this.tableTodos,
                Key: {
                    userId, 
                    todoId
                }
            }
        )
    }
}