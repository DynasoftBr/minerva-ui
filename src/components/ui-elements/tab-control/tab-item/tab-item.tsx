import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";

@Component
export default class TabItem extends Vue {

    @Prop({ default: false })
    public active: boolean;

    @Prop({ default: "" })
    public title: string;

    private internalActive: boolean = false;

    public get ariaLabelledby(): string {
        return this.title.replace(new RegExp(/\s/, "g"), "-");
    }

    public setActive() {
        this.internalActive = true;
        this.$emit("activated", this);
    }

    public setInactive() {
        this.internalActive = false;
    }

    @Watch("active")
    protected onActiveChange() {
        this.internalActive = this.active;
    }

    protected created() {
        this.internalActive = this.active;
    }

    protected render(h: any) {
        return (
            <div class={{
                "tab-pane": true,
                "fade": true,
                "show": this.internalActive,
                "active": this.internalActive
            }} role="tabpanel" aria-labelledby={this.ariaLabelledby}>

                {this.$slots.default}
            </div>
        );
    }
}