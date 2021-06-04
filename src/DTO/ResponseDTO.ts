/**
 * @swagger
 * components:
 *  schemas:
 *      Response:
 *          type: object
 *          properties:
 *              code:
 *                  type: string
 *                  description: The response Code.
 *              source:
 *                  type: string
 *                  description: The source of the response.
 *              message:
 *                  type: string
 *                  description: The response message.
 *              detail:
 *                  type: string
 *                  description: The detailed content of the response, if available.
 *              datetime:
 *                  type: string
 *                  description: The response date and time.
 *          example:
 *              code: 200
 *              message: Response from the service!
 *              detail: Response/Error detail.
 *              datetime: 30/05/2021 09:21:54
 */
export class ResponseDTO {
    code: string;
    source: string;
    message: string;
    detail: string;
    datetime: string;
}