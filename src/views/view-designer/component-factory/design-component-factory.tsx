import { ComponentFactory } from "./component-factory";
import { DesignComponentToRender } from "./design-component-to-render";
import { DraggableDecorator } from "../component-decorators/draggable-decorator";
import { PaletteDecorator } from "../component-decorators/palette-decorator";
import { IComponentToRender } from "../models/icomponent-to-render";

export class DesignComponentFactory extends ComponentFactory {

    private nonDraggableComponents = ["content-wrapper", "content-container", "sidebar-palette"];

    public createComponentToRender(component: IComponentToRender): DesignComponentToRender {
        let componentToRender = new DesignComponentToRender(component, this);
        componentToRender.name = component.name;

        componentToRender = this.setDraggable(componentToRender);
        componentToRender = this.addPalette(componentToRender);

        return componentToRender;
    }

    private setDraggable(component: DesignComponentToRender): DesignComponentToRender {
        if (this.nonDraggableComponents.indexOf(component.name) === -1) {
            return new DraggableDecorator(component, this);
        }

        return component;
    }

    private addPalette(component: DesignComponentToRender): DesignComponentToRender {
        if (component.name === "content-wrapper") {
            return new PaletteDecorator(component, this);
        }

        return component;
    }

}