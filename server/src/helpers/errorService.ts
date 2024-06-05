class ErrorService extends Error{
    public status
    public errors
    constructor(status: number, message: string, errors?: any){
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static BadRequest = (message: string, errors =[]) =>{
        return new ErrorService(400, message);
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
    static WrongBookingParameters = () => {
        return new ErrorService(400, 'Попробуйте выбрать другую дату посещения или изменить количество заявок')
    }
}

export default ErrorService
