import Vue, { DirectiveOptions } from "vue";
import Sortable, { SortableEvent, GroupOptions } from "sortablejs";
import { SortableElement } from "../models/sortable-element";
import { IComponentToRender } from "../models/icomponent-to-render";

class SortableDirectiveDefinition implements DirectiveOptions {
    public bind = (el: SortableElement, binding, vnode) => {
        const options: Sortable.Options = binding.value.options || {};
        options.onEnd = (e) => this.onEnd(e);

        const sortable = Sortable.create(el, options);

        el.sortable = sortable;
        el.component = binding.value.component;
    }

    public unbind = (el: SortableElement, binding, vnode) => {
        el.sortable.destroy();

        delete el.sortable;
        delete el.component;
    }

    public update = (el: SortableElement, binding, vnode) => {
        el.sortable.destroy();

        const options: Sortable.Options = binding.value.options || {};
        options.onEnd = (e) => this.onEnd(e);

        const sortable = Sortable.create(el, options);

        el.sortable = sortable;
        el.component = binding.value.component;
    }

    private onEnd(e: SortableEvent): void {
        const fromList = e.from as SortableElement;
        const toList = e.to as SortableElement;

        // Ignore dropping to pallete.
        if ((toList.sortable.options.group as GroupOptions).name == "palette") {
            return;
        }

        const fromGroupName = (fromList.sortable.options.group as GroupOptions).name;

        if (fromGroupName === "palette") {
            const componentDropped: IComponentToRender = JSON.parse(e.item.dataset.component);
            e.newIndex = Array.prototype.indexOf.call(toList.children, e.item);

            // Add component to new list.
            if (e.newIndex == toList.component.children.length) {
                toList.component.children.push(componentDropped);
            } else {
                toList.component.children.splice(e.newIndex, 0, componentDropped);
            }

            if (fromGroupName == "palette") {
                e.item.remove();
            }
        }



        // // Remove the dropped item since it will be rendered by vue.
        // if (fromGroupName == "palette") {
        //     e.item.remove();
        // } else if (fromList != toList) {
        //     toList.removeChild(e.item);
        //     if (fromList.children.length > 0) {
        //         fromList.insertBefore(e.item, fromList.children[e.oldIndex]);
        //     } else {
        //         fromList.appendChild(e.item);
        //     }
        // }
    }
}

export const SortableDirective = new SortableDirectiveDefinition();

Vue.directive("sortable-directive", SortableDirective);