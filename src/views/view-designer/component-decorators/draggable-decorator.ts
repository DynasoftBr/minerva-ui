import { ComponentDecorator } from "./component-decorator";

export class DraggableDecorator extends ComponentDecorator {
    public buildData() {
        const data = super.buildData();
        data.attrs = data.attrs || {};
        data.attrs.draggable = true;

        return data;
    }
}