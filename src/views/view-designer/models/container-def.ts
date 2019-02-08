export interface ContainerDef {
    name?: string;
    flow: "row" | "col";
    allowed?: string[];
    denied?: string[];
    max?: number;
}
