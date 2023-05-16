import { type Response } from 'express';
import { Utils } from './utils';

enum HttpStatus {
    OK = 200,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    INTERNAL_SERVER_ERROR = 500
}

export class HttpResponse extends Utils {
    Ok(resp: Response, data?: unknown): Response {
        return resp.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            statusMsg: 'success',
            data
        });
    }

    BadRequest(resp: Response, data?: unknown): Response {
        const err = data as string;

        return resp.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            statusMsg: 'Bad Request',
            error: err.toString()
        });
    }

    NotFound(resp: Response, data?: unknown): Response {
        const err = data as string;

        return resp.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            statusMsg: 'Not Found',
            error: err.toString()
        });
    }

    Unauthorized(resp: Response, data?: unknown): Response {
        const err = data as string;

        return resp.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            statusMsg: 'Unauthorized',
            error: err.toString()
        });
    }

    Forbidden(resp: Response, data?: unknown): Response {
        const err = data as string;

        return resp.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            statusMsg: 'Forbidden',
            error: err.toString()
        });
    }

    Error(resp: Response, data?: unknown): Response {
        const err = data as string;

        return resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            statusMsg: 'Error',
            error: err.toString()
        });
    }
}
