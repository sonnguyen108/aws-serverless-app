import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { generateImageUrl } from '../../fileStorage/attachmentUtils.mjs'

export const handler = middy().use(httpErrorHandler())
                              .use(cors({ credentials: true }))
                              .handler(async (event) => {
                                const userId = getUserId(event);
                                const todoId = e.pathParameters.todoId;
                                const url = await generateImageUrl(todoId);

                                return {
                                  statusCode: 201,
                                  body: JSON.stringify({
                                    uploadUrl: url
                                  })
                                }
                              });