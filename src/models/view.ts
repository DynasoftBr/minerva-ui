import { ComponentToRender } from "@/views/view-designer/models/component-to-render";
import { ConcreteEntity, Refs } from "@poseidon/client/src";

export interface View extends ConcreteEntity {
    entityType: Refs.EntityTypeRef;
    components: ComponentToRender[];
}