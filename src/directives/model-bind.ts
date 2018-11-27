import Vue, { DirectiveOptions } from "vue";

export const ClickOutside: DirectiveOptions = {
    bind(el: any, binding, vnode) {

    },
    unbind(el: any, binding) {
        if (binding.value != undefined)
            document.body.removeEventListener("click", el.clickOutsideEvent);
    },
    update(el: any, binding, vnode, oldValue) {
        ClickOutside.bind(el, binding, vnode, oldValue);
    }
};

Vue.directive("click-outside", ClickOutside);