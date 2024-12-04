import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { getUserId } from '../utils.mjs'
import { getTodos } from '../../businessLogic/todo.mjs'
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('HTTP get TODOS');

export const handler = middy().use(httpErrorHandler())
                              .use(cors({ credentials: true }))
                              .handler(async (event) => {
                                const userId = getUserId(event);
                                let todosData = await getTodos(userId);
                                // if (!todosData) todosData = [];

                                return {
                                  statusCode: 200,
                                  headers: {
                                    'Access-Control-Allow-Origin': '*',
                                    'Access-Control-Allow-Credentials': true,
                                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                                    'Access-Control-Allow-Methods': 'GET,OPTIONS'
                                  },
                                  body: JSON.stringify({ items: todosData })
                                }
                              });