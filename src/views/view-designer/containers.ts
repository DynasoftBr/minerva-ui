import { ContainerDef } from "./models/container-def";

export const Containers: ContainerDef[] = [
    {
        name: "grid-row",
        flow: "row",
        allowed: ["grid-col"]
    },
    {
        name: "grid-col",
        flow: "col",
        denied: ["grid-col"]
    },
    {
        name: "content-container",
        flow: "col",
        allowed: ["grid-row"]
    }
];