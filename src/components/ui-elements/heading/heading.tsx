import { Component, Vue, Prop } from "vue-property-decorator";
import { CreateElement } from "vue";

@Component
export default class Heading extends Vue {

    @Prop({ default: 1 })
    public size!: number;

    @Prop({ default: false })
    public noMargin: boolean;

    protected render(createElement: CreateElement) {
        const tagName = `h${this.size}`;

        return createElement(tagName, {
            class: { "heading": true, "m-0": this.noMargin },
            on: {
                click: (e) => this.$emit("click", e)
            }
        }, this.$slots.default);
    }
}