export {};

declare global {
    namespace Express {
        interface Request {
            role: string;
        }
    }
}
