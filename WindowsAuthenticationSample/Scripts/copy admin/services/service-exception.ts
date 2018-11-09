
export class ValidationMessage {
    constructor(public code: string, public description: string){}
}

export class ServiceException {
    constructor(public isBusinessException: boolean, public validationMessages?: ValidationMessage[]){}
}