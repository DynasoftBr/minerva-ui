import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class BrandLink extends Vue {

    @Prop()
    public brandLogo!: string;

    @Prop()
    public brandText!: string;

    @Prop()
    public logoAltText!: string;

    @Prop({ default: "#" })
    public href!: string;

    protected render(h: any) {
        return (
            <a href={this.href} class="brand-link">
                <img src={this.brandLogo} alt={this.logoAltText}
                    class="brand-image img-circle elevation-3" style="opacity: .8" />
                <span class="brand-text font-weight-light">{this.brandText}</span>
            </a>
        );
    }
}