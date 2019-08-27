import { ContainerFlow } from "./enums/container-flow";

export interface ContainerDef {
    name?: string;
    flow: ContainerFlow;
    allowed?: string[];
    denied?: string[];
    max?: number;
}