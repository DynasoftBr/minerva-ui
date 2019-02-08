export interface ICompoentProp {
    name: string;
    validation: IComponentPropValidation;
}

export interface IComponentPropValidation {
    type: ComponentPropertyTypes;
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
    enum?: string[];
    items?: IComponentPropValidation;
    uniqueItems?: boolean;
    multipleOf?: number;
    default?: string;
    base64Encoded?: boolean;
}

export enum ComponentPropertyTypes {
    string = "string",
    int = "integer",
    number = "number",
    dateTime = "dateTime",
    boolean = "boolean",
    array = "array",
    enum = "enum"
}