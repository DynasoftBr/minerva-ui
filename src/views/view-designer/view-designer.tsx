import { Component, Vue } from "vue-property-decorator";
import { DesignComponentFactory } from "./component-factory/design-component-factory";
import GlobalEvents from "vue-global-events";
import { ComponentElement } from "./models/component-element";
import { CreateElement, VNodeDirective } from "vue";
import { DesignComponentToRender } from "./component-factory/design-component-to-render";
import { ContainerDef } from "./models/container-def";
import { Containers } from "./containers";

import "./view-designer.scss";
import { IComponentToRender } from "./models/icomponent-to-render";
import MainLayout from "@/components/core/main-layout/main-layout";

@Component({
    components: {
        "content-wrapper": () => import("@/components/core/content-wrapper/content-wrapper")
    }
})
export default class ViewDesigner extends Vue {

    private components: DesignComponentToRender[] = [];

    private factory = new DesignComponentFactory();
    private toEl: ComponentElement;
    private fromEl: ComponentElement;
    private dragEl: ComponentElement;
    private oldIdx: number;
    private fromPalette: boolean;

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
                                            { name: "component-actions" },
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

        const build = components.map((comp) => this.factory.createComponent(comp));
        this.components = build;
    }

    protected render(createElement: CreateElement) {
        return (
            <MainLayout>
                <div class="view-designer editing">
                    <GlobalEvents
                        onDragover={(e: DragEvent) => this.onDragover(e)}
                        onDragstart={(e: DragEvent) => this.onDragstart(e)}
                        onDragend={(e: DragEvent) => this.onDragend(e)}>
                    </GlobalEvents>
                    {this.components.map((comp) => comp.render(createElement))}
                </div>
            </MainLayout>
        );
    }

    private async onDragstart(e: DragEvent) {
        e.stopPropagation();

        const dragEl = (e.target as HTMLElement) as ComponentElement;

        // Set the drag img to and new, not in dom element.
        // e.dataTransfer.setDragImage(document.createElement("div"), this.dragClickOffsetX, this.dragClickOffsetY);

        const parentEl = dragEl.parentElement as ComponentElement;

        // If the it comes from the palette, get the component to render from data attr.
        if (parentEl.classList.contains("simple-list")) {
            this.fromPalette = true;
            e.dataTransfer.effectAllowed = "copy";

            const undelineElement = dragEl.getElementsByClassName("underline-component")[0]
                .childNodes[0] as ComponentElement;
            this.dragEl = new Vue({
                render: (createElement) => undelineElement.component
                    .render(createElement)
            }).$mount().$el as ComponentElement;
        } else {
            // If it's already in the form, get from the prop set by component directive.
            this.dragEl = dragEl;
            this.fromPalette = false;
            e.dataTransfer.effectAllowed = "move";
            this.fromEl = parentEl;
            this.oldIdx = [...parentEl.childNodes].indexOf(this.dragEl);
        }

        this.dragEl.classList.add("dragging");
    }

    private onDragover(e: DragEvent): void {
        let target = e.target as ComponentElement;

        // Move up to the parent if it's not a vue component;
        if (target.component == null) {
            target = target.closest("[draggable=true]") as ComponentElement;
            if (target == null) {
                return;
            }
        }

        // We are over the clone that is already in this place.
        if (target == this.dragEl || this.dragEl.contains(target)) {
            console.log("over self");
            return e.preventDefault();
        }

        const palette = (this.$refs.palette as Vue).$el;
        if (target == palette || palette.contains(target)) {
            console.log("Over palette");
            return;
        }

        // Get the drop position of element.
        const dropPosition = this.findDropPosition(e.clientX, e.clientY, target);

        // If drop position is null, means this dragged component can't be dropped here.
        if (dropPosition == null) {
            return;
        }

        // It's a valid place to drop.
        e.preventDefault();

        if (dropPosition.position == "inside") {
            dropPosition.containerEl.appendChild(this.dragEl);
        } else if (dropPosition.position == "before") {
            dropPosition.refEl.insertAdjacentElement("beforebegin", this.dragEl);
        } else {
            dropPosition.refEl.insertAdjacentElement("afterend", this.dragEl);
        }

        this.toEl = dropPosition.containerEl;
    }

    private onDragend(e: DragEvent): any {
        this.dragEl.classList.remove("dragging");

        // function to reset variables
        const resetVariables = () => {
            this.fromEl = undefined;
            this.toEl = undefined;
            this.oldIdx = undefined;
            this.dragEl = undefined;
        };

        if (this.toEl == null) {
            return resetVariables();
        }

        const dropped = e.dataTransfer.dropEffect != "none";
        const newIdx = [...this.toEl.childNodes].indexOf(this.dragEl);

        // Put evething back to it's place before updating the state.
        // That is needed because othewise vue get confused with the changed dom.
        if (!this.fromPalette) {
            const refEl = this.fromEl.childNodes[this.oldIdx] as ComponentElement;
            if (refEl) {
                if (this.toEl == this.fromEl) {
                    if (newIdx < this.oldIdx) {
                        refEl.insertAdjacentElement("afterend", this.dragEl);
                    } else {
                        refEl.insertAdjacentElement("beforebegin", this.dragEl);
                    }
                } else {
                    refEl.insertAdjacentElement("beforebegin", this.dragEl);
                }
            } else {
                this.fromEl.appendChild(this.dragEl);
            }

            if (dropped) {
                // Remove the dragged component from the initial list an add it to the new one.
                this.fromEl.component.children.splice(this.oldIdx, 1);
                this.toEl.component.children.splice(newIdx, 0, this.dragEl.component);
            }
        } else {
            this.dragEl.remove();
            this.toEl.component.children.splice(newIdx, 0, this.dragEl.component);
        }

        resetVariables();
    }

    private findDropPosition(x: number, y: number, target: ComponentElement): DropPosition {

        let container = Containers.find((item) => item.name === target.component.name);

        const targetBounding = target.getBoundingClientRect();
        const isContainerButCantDrop = (container && !this.isInTheBorder(x, y, targetBounding))
            && !this.canDrop(container, target);

        let propsByFlow: PropsUsedByFlow;
        let axisVal: number;

        const isNotContainerOrInBorderOfOne = !container || this.isInTheBorder(x, y, targetBounding);
        const isNotContentContaninerOrContentWrapper = !(target.component.name == "content-container" ||
            target.component.name == "content-wrapper");

        if (isContainerButCantDrop) {

            // The container doesn't accept this element.
            return null;

        } else if (isNotContainerOrInBorderOfOne && isNotContentContaninerOrContentWrapper) {
            // In this case the drop place is the parent.
            const parentEl = target.parentElement as ComponentElement;
            container = Containers.find((item) => item.name === parentEl.component.name);

            // The parent doesn't accept this element.
            if (!this.canDrop(container, parentEl)) {
                return null;
            }

            // Get properties used in calcs for each flow.
            propsByFlow = this.propsByFlow(container.flow);
            axisVal = propsByFlow.axis == "x" ? x : y;
            const posPropVal = targetBounding[propsByFlow.posProp];
            const sizePropVal = targetBounding[propsByFlow.sizeProp];

            // Calculate if should be inserted before or after.
            const beforeOrAfter = this.isBeforeOrAfter(axisVal, posPropVal, sizePropVal);

            return {
                containerEl: parentEl,
                position: beforeOrAfter,
                refEl: target,
                refElIdx: [...parentEl.childNodes].indexOf(target)
            };
        }

        // Get properties used in calcs for each flow.
        propsByFlow = this.propsByFlow(container.flow);
        axisVal = propsByFlow.axis == "x" ? x : y;

        const children = [...target.childNodes];

        // const idxDrag = children.indexOf(this.dragEl);
        // if (idxDrag) {
        //     children.splice(idxDrag, 1);
        // }

        // Iterate the children of this element trying to find the closest to the current point.
        for (const [idx, child] of children.entries()) {
            const childBounding = (child as HTMLElement).getBoundingClientRect();
            const posPropVal = childBounding[propsByFlow.posProp];
            const sizePropVal = childBounding[propsByFlow.sizeProp];

            const isBetweenEl = posPropVal <= axisVal && (posPropVal + sizePropVal) >= axisVal;
            const isBeforeFirstEl = idx == 0 && posPropVal > axisVal;
            const isAfterLastEl = idx == (target.childNodes.length - 1) && (posPropVal + sizePropVal) < axisVal;

            // Check if the point is between the elements bounds.
            let position: "before" | "after";
            if (isBetweenEl) {
                position = this.isBeforeOrAfter(axisVal, posPropVal, sizePropVal);
            } else if (isBeforeFirstEl) {
                position = "before";
            } else if (isAfterLastEl) {
                position = "after";
            }

            // If we got a position.
            if (position) {
                return {
                    position, refEl: child as ComponentElement,
                    containerEl: target, refElIdx: idx
                };
            }
        }

        // Null means just append the child.
        return { containerEl: target, position: "inside" };
    }

    private isBeforeOrAfter(axis: number, posPropVal: number, sizePropVal: number): "before" | "after" {
        if (axis <= posPropVal + (sizePropVal / 2)) {
            return "before";
        } else {
            return "after";
        }
    }

    private propsByFlow(flow: "row" | "col"): PropsUsedByFlow {
        if (flow == "row") {
            return {
                axis: "x",
                posProp: "left",
                sizeProp: "width"
            };
        } else {
            return {
                axis: "y",
                posProp: "top",
                sizeProp: "height"
            };
        }
    }

    private canDrop(container: ContainerDef, containerEl: ComponentElement): any {
        const dragName = this.dragEl.component.name;
        return (container.allowed == null || container.allowed.includes(dragName))
            && (container.denied == null || !container.denied.includes(dragName))
            && (container.max == null || container.max > containerEl.component.children.length);
    }

    private isInTheBorder(x: number, y: number, targetBounding: ClientRect | DOMRect): boolean {
        const tolerance = 5;
        return x <= targetBounding.left + tolerance || x >= targetBounding.right - tolerance
            || y <= targetBounding.top + tolerance || y >= targetBounding.bottom - tolerance;
    }
}

interface PropsUsedByFlow {
    axis: string;
    posProp: string;
    sizeProp: string;
}

interface DropPosition {
    position: "before" | "after" | "inside";
    containerEl: ComponentElement;
    refEl?: ComponentElement;
    refElIdx?: number;
}