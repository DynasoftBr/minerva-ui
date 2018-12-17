import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component({ name: "grid-row" })
export default class GridRow extends Vue {

    @Prop({ default: false })
    public noGutters: boolean;

    protected render(h: any) {
        return (
            <div class={{ "row": true, "no-gutters": this.noGutters }}>
                {this.$slots.default}
            </div>
        );
    }
}