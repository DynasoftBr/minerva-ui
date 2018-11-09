import axios, { AxiosResponse } from "axios";

export class PoseidonLink {

    constructor(public readonly endpoint: string) { }

    public async login(user: string, pass: string, throwErr?: boolean) {
        return;
    }

    public async getEntityTypeByName(entityTypeName: string, throwErr?: boolean) {
        return;
    }

    public async getById(entityType: EntityType, id: string, throwErr?: boolean) {
        return;
    }

    public async getEntitites(entityType: EntityType, skip?: number, take?: number, throwErr?: boolean) {
        const response = await axios.request({ url: this.endpoint });

        return this.handleResponse(response);
    }

    private handleResponse(response: AxiosResponse, throwErr: boolean = false) {
        if ((response.status >= 200 && response.status <= 299))
            return response.data;

        const err: ErrorResponse = {
            statusCode: response.status,
            error: response.data
        };

        if (throwErr)
            throw err;

        return err;
    }
}

export interface ErrorResponse {
    statusCode: number;
    error: object;
}

export enum EntityType {
    entityType = "EntityType"
}