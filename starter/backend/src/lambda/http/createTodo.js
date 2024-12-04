import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { createTodo } from '../../businessLogic/todo.mjs'
import { getUserId } from '../utils.mjs'

export const handler = middy().use(httpErrorHandler())
                              .use(cors({ credentials: true }))
                              .handler(async (event) => {
                                const userId = getUserId(event);
                                const todo = JSON.parse(event.body);
                                const todosData = await createTodo(todo, userId);

                                return {
                                  statusCode: 201,
                                  headers: {
                                    'Access-Control-Allow-Origin': '*',
                                    'Access-Control-Allow-Credentials': true,
                                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                                  },
                                  body: JSON.stringify({ item: todosData })
                                }
                              });