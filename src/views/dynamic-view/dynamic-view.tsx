import { Component, Vue, Prop } from "vue-property-decorator";
import MainLayout from "@/components/core/main-layout/main-layout";
import { CreateElement } from "vue";
import { Client } from "@poseidon/client";
import { View } from "@/models/view";
import { EntityType } from "@poseidon/core-models";

@Component
export default class DynamicView extends Vue {

    @Prop()
    public entityType: EntityType;

    private view: View = null;

    protected async created() {
        const query = Client.query<View>("View")
            .where.entityType.name.equals("EntityType");

        this.view = await query.execute()[0];
        console.log(await query.execute());
    }

    protected render(createElement: CreateElement) {
        return (
            <MainLayout>
                {this.view && this.view.components.map((comp) =>
                    comp.render(createElement))}
            </MainLayout>
        );
    }
}