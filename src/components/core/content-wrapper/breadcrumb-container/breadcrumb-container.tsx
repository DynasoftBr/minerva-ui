import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class BreadcrumbContainer extends Vue {

    @Prop({ default: false })
    public pullRight!: boolean;

    protected render(h: any) {
        return (
            <ol class="breadcrumb float-sm-right">
                {this.$slots.default}
            </ol>
        );
    }
}