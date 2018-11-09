import Vue, { DirectiveOptions } from "vue";

export const Indeterminate: DirectiveOptions = {
    bind(el, binding, vnode, oldVnode) {
        (vnode.componentInstance.$refs["checkbox"] as any).indeterminate = Boolean(binding.value || false);
    },
    update(el, binding, vnode, oldVnode) {
        (vnode.componentInstance.$refs["checkbox"] as any).indeterminate = Boolean(binding.value || false);
    }
};

Vue.directive("indeterminate", Indeterminate);