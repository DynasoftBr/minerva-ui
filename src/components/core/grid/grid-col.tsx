import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component({ name: "grid-col" })
export default class GridCol extends Vue {

    @Prop()
    public size: number;

    protected render(h: any) {
        const classes = {
            "col": this.size == undefined
        };

        if (this.size)
            classes["col-" + this.size] = true;

        return (
            <div class={classes}>
                {this.$slots.default}
            </div>
        );
    }
}