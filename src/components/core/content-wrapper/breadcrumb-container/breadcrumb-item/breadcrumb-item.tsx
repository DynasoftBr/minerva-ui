import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class BreadcrumbItem extends Vue {

    @Prop({ default: false })
    public isActive!: boolean;

    @Prop()
    public title!: string;

    @Prop()
    public href!: string;

    protected render(h: any) {
        let item: any;

        if (this.isActive) {
            item = this.title;
        } else {
            item = <a href={this.href}>{this.title}</a>;
        }

        return (
            <li class={{ "breadcrumb-item": true, "active": this.isActive }}>
                {item}
            </li>
        );
    }
}