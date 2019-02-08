import Vue, { VueConstructor } from "vue";

export interface IRoute {
    path: string | RegExp;
    component: VueConstructor<Vue>;
}