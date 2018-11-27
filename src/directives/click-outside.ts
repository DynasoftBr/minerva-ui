import Vue, { DirectiveOptions } from "vue";

export const ClickOutside: DirectiveOptions = {
    bind(el: any, binding, vnode) {
        if (binding.value != undefined) {
            el.clickOutsideEvent = (event) => {
                // here I check that click was outside the el and his childrens
                if (!(el == event.target || el.contains(event.target))) {
                    // and if it did, call method provided in attribute value
                    binding.value(event);
                }
            };
            document.body.addEventListener("click", el.clickOutsideEvent);
        }
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