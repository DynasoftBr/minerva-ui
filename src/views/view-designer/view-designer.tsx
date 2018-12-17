import { Component, Vue } from "vue-property-decorator";
import { ComponentToRender } from "./models/component-to-render";
import { IComponentToRender } from "./models/icomponent-to-render";
import { DesignComponentFactory } from "./component-factory/design-component-factory";

import "./view-designer.scss";
import { ComponentDirective } from "./directives/component-directive";
import { SortableDirective } from "./directives/sortable-directive";
import Sortable, { GroupOptions } from "sortablejs";
import GlobalEvents from "vue-global-events";
import { ComponentElement } from "./models/component-element";
import { CreateElement, VNodeDirective } from "vue";
import { DesignComponentToRender } from "./component-factory/design-component-to-render";
import { DraggableComponent } from "./directives/draggable-component";

@Component({
    directives: {
        "component-directive": ComponentDirective,
        "sortable-directive": SortableDirective,
        "draggable-component": DraggableComponent
    }
})
export default class ViewDesigner extends Vue {

    private components: DesignComponentToRender[];

    private factory = new DesignComponentFactory();
    private draggingComponent: IComponentToRender = null;
    private fromComponent: IComponentToRender;
    private toComponent: IComponentToRender;
    private cloneEl: HTMLElement;
    private dragEl: ComponentElement;
    private dragClickOffsetX = 0;
    private dragClickOffsetY = 0;
    private oldIdx = -1;
    private newIdx = -1;

    private containers: ContainerDef[] = [
        { name: "grid-row", flow: "row" },
        { name: "grid-col", flow: "col" }
    ];


    public get clonedComponents(): IComponentToRender[] {
        const cloned = JSON.parse(JSON.stringify(this.components));

        return cloned;
    }

    protected created() {
        const components: IComponentToRender[] = [
            {
                name: "content-wrapper",
                children: [
                    {
                        name: "content-container",
                        children: [
                            {
                                name: "grid-row",
                                children: [
                                    { name: "grid-col" },
                                    {
                                        name: "grid-col",
                                        children: [
                                            { name: "input-text" }
                                        ]
                                    },
                                    { name: "grid-col" }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];

        this.components = components.map((comp) => this.factory.createComponentToRender(comp));
    }

    protected render(createElement: CreateElement) {
        return (
            <div class="view-designer editing">
                <GlobalEvents
                    onDragover={(e: DragEvent) => this.onDragover(e)}
                    onDragstart={(e: DragEvent) => this.onDragstart(e)}
                    onDragend={(e: DragEvent) => this.onDragend(e)}>
                </GlobalEvents>
                {this.components.map((comp) => comp.render(createElement))}
            </div>
        );
    }

    private onDragend(e: DragEvent): any {
        // this.cloneEl.remove();
        // this.cloneEl = undefined;
        this.draggingComponent = undefined;
        this.fromComponent = undefined;
        this.dragEl = undefined;

    }

    private async onDragstart(e: DragEvent) {
        e.stopPropagation();

        const dragEl = this.dragEl = (e.target as HTMLElement) as ComponentElement;

        this.dragClickOffsetX = e.layerX;
        this.dragClickOffsetY = e.layerY;

        // Set the drag img to and new, not in dom element.
        e.dataTransfer.setDragImage(document.createElement("div"), this.dragClickOffsetX, this.dragClickOffsetY);

        const parentEl = dragEl.parentElement as ComponentElement;

        // If the it comes from the palette, get the component to render from data attr.
        if (parentEl.classList.contains("simple-list")) {
            const component = ComponentToRender.parse(dragEl.dataset.component);
            this.draggingComponent = this.factory.createComponentToRender(component);
            e.dataTransfer.dropEffect = "copy";
        } else {
            // If it's already in the form, get from the prop set by component directive.
            this.draggingComponent = dragEl.component;
            this.fromComponent = parentEl.component;
            this.oldIdx = this.fromComponent.children.indexOf(this.draggingComponent);
        }
    }

    private onDragover(e: DragEvent): void {
        let target = e.target as ComponentElement;

        // Move up to the parent if it's not a vue component;
        if (!this.isComponent(target)) {
            target = target.closest("[draggable=true]") as ComponentElement;
            if (target == null)
                return;
        }

        if (target.component == this.draggingComponent || this.dragEl.contains(target)) {
            e.preventDefault();
            return;
        }

        // Get the drop position of element.
        const dropPosition = this.dropPosition(e.pageX, e.pageY, target);

        // If drop position is null, means this dragged component can't be dropped here.
        if (dropPosition == null)
            return;

        e.preventDefault();

        if (dropPosition == "into") {
            const posInside = this.getDropPositionInside(e, target);

            // If the position returned is null, just append the new child
            if (!posInside) {
                target.appendChild(this.dragEl);
            } else if (posInside.position == "before") {
                target.insertBefore(this.dragEl, posInside.refEl);
            } else {
                posInside.refEl.insertAdjacentElement("afterend", this.dragEl);
            }
        } else if (dropPosition == "before") {
            target.parentElement.insertBefore(this.dragEl, target);
        } else if (dropPosition == "after") {
            target.insertAdjacentElement("afterend", target);
        }
    }

    private isComponent(target: HTMLElement): boolean {
        return (target as any).component != null;
    }

    private dropPosition(x: number, y: number, target: ComponentElement): "before" | "after" | "into" {
        const targetBounding = target.getBoundingClientRect();
        const container = this.containers.find((item) => item.name === target.component.name);

        if (container && !this.isInTheBorder(x, y, targetBounding)) {
            if (this.canDrop(container, target))
                return "into";

            return null;
        } else if (!container || (container && this.isInTheBorder(x, y, targetBounding))) {

            const parentEl = target.parentElement as ComponentElement;
            const parentContainer = this.containers
                .find((item) => item.name === parentEl.component.name);

            // If the parent container is null means it can't accept dropped components.
            if (parentContainer == null) {
                return null;
            }

            if (this.canDrop(parentContainer, parentEl)) {
                if (parentContainer.flow == "row") {
                    const pos = this.leftOrRight(x, targetBounding);

                    return pos == "left" ? "before" : "after";
                } else {
                    const pos = this.topOrBottom(y, targetBounding);

                    return pos == "top" ? "before" : "after";
                }
            }

            return null;
        }
    }

    private getDropPositionInside(e: DragEvent, target: ComponentElement): DropPositionInside {
        const container = this.containers
            .find((item) => item.name === target.component.name);

        const children: HTMLElement[] = [];

        target.childNodes.forEach((child: HTMLElement) => children.push(child));

        // Null means just append the child.
        if (children.length == 0) return null;

        let axis: number;
        let posProp: string;
        let sizeProp: string;
        let beforeMarginProp: string;
        let afterMarginProp: string;

        // Setup the vars and props used according to the flow of the container.
        if (container.flow == "row") {
            axis = e.offsetX;
            posProp = "offsetLeft";
            sizeProp = "offsetWidth";
            beforeMarginProp = "marginLeft";
            afterMarginProp = "marginRight";
        } else {
            axis = e.offsetY;
            posProp = "offsetTop";
            sizeProp = "offsetHeight";
            beforeMarginProp = "marginTop";
            afterMarginProp = "marginBottom";
        }

        // If point is before the first child, return the position before it.
        if (children[0][posProp] > axis) {
            return { position: "before", refEl: children[0] as HTMLElement };

            // If point is after the last child, return the position after it.
        } else if (children[children.length - 1][posProp] < axis) {
            return { position: "after", refEl: children[children.length - 1] as HTMLElement };
        }

        for (const child of children) {
            const posPropVal = child[posProp];
            const sizePropVal = child[sizeProp];
            const computed = document.defaultView.getComputedStyle(child);
            const beforeMarginPropVal = parseInt(computed[beforeMarginProp]);
            const afterMarginPropVal = parseInt(computed[afterMarginProp]);

            // Check if the point is between the elements bounds.
            if ((posPropVal - beforeMarginPropVal) <= axis && (posPropVal + sizePropVal + afterMarginPropVal) >= axis) {

                // Check if the point is before the middle.
                if (axis <= (posPropVal + (sizePropVal / 2))) {
                    return { position: "before", refEl: child };
                } else {
                    return { position: "after", refEl: child };
                }
            }
        }

        // Null means just append the child.
        return null;
    }

    private canDrop(container: ContainerDef, containerEl: ComponentElement): any {
        const dragName = this.draggingComponent.name;
        return (container.allowed == null || container.allowed.includes(dragName))
            && (container.denied == null || !container.denied.includes(dragName))
            && (container.max == null || container.max > containerEl.component.children.length);
    }

    private isInTheBorder(x: number, y: number, targetBounding: ClientRect | DOMRect): boolean {
        const tolerance = 5;
        return x <= targetBounding.left + tolerance || x >= targetBounding.right - tolerance
            || y <= targetBounding.top + tolerance || y >= targetBounding.bottom - tolerance;
    }

    private topOrBottom(y: number, targetBounding: ClientRect | DOMRect): "top" | "bottom" {
        const middle = targetBounding.top + ((targetBounding.bottom - targetBounding.top) / 2);

        return y <= middle ? "top" : "bottom";
    }

    private leftOrRight(x: number, targetBounding: ClientRect | DOMRect): "left" | "right" {
        const center = targetBounding.left + ((targetBounding.right - targetBounding.left) / 2);

        return x <= center ? "left" : "right";
    }

    private prepareComponents(components: IComponentToRender[]) {
        components.map((comp) => {
            if (!comp.class) {
                comp.class = { "dragging-el": false };
            } else {
                comp.class = {
                    ...comp.class,
                    "dragging-el": false
                };
            }

            this.prepareComponents(comp.children);
        });
    }

    private removeFromArray<T>(arr: T[], item: T) {
        const idx = arr.indexOf(item);
        arr.splice(idx, 1);
    }
}

interface ContainerDef {
    name: string;
    flow: "row" | "col";
    allowed?: string[];
    denied?: string[];
    max?: number;
}

interface DropPositionInside {
    position: "before" | "after";
    refEl: HTMLElement;
}