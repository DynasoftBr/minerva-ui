import { DraggableDecorator } from "./views/view-designer/component-decorators/draggable-decorator";
import { ComponentToRender } from "./views/view-designer/models/component-to-render";

const x = new DraggableDecorator({} as ComponentToRender);
console.log(x.directives);