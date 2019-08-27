import { ComponentToRender } from "@/views/view-designer/models/component-to-render";
import { EntityTypeRef, ConcreteEntity } from "@poseidon/core-models";

export interface View extends ConcreteEntity {
    entityType: EntityTypeRef;
    components: ComponentToRender[];
}