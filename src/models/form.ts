import { Refs, ConcreteEntity } from "@poseidon/core-models";
import { ComponentToRender } from "@/views/view-designer/models/component-to-render";

export interface View extends ConcreteEntity {
    entityType: Refs.EntityTypeRef;
    components: ComponentToRender[];
}