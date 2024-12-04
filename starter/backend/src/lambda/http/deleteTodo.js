import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { deleteTodo } from '../../businessLogic/todo.mjs'
import { getUserId } from '../utils.mjs'

export const handler = middy().use(httpErrorHandler())
                              .use(cors({ credentials: true }))
                              .handler(async (event) => {
                                const userId = getUserId(event);
                                const todoId = event.pathParameters.todoId;
                                const deletedTodo = deleteTodo(userId, todoId);

                                return {
                                  statusCode: 204
                                }
                              });