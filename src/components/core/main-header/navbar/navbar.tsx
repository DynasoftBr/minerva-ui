import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class NavBar extends Vue {

    @Prop({ default: false })
    public pullRight!: boolean;

    @Prop({ default: false })
    public flexFlow!: boolean;

    protected render(h: any) {
        return (
            <ul class={{ "navbar-nav": true, "ml-auto": this.pullRight, "nav-flow": this.flexFlow }}>
                {this.$slots.default}
            </ul>
        );
    }
}