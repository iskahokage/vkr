class ErrorService extends Error{
    public status
    public errors
    constructor(status: number, message: string, errors?: any){
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static BadRequest = (message: string, errors: any =[]) =>{
        return new ErrorService(400, message, errors);
    }
    static UnauthorizedError = () =>{
        return new ErrorService(401, 'You are not authorized')
    }
    static ForbiddenError = (message: string) =>{
        return new ErrorService(403, message);
    }
    static ServerInternalError = (message: string) =>{
        return new ErrorService(500, message)
    }
}

export default ErrorService
