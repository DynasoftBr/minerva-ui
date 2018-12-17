import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ControlSidebar extends Vue {

    @Prop({ default: false })
    public isOpen: boolean;

    @Prop({ default: true })
    public darkTheme: boolean;

    protected render(h: any) {
        return (
            <aside class={{
                "control-sidebar": true,
                "control-sidebar-light": !this.darkTheme,
                "control-sidebar-dark": this.darkTheme,
                "control-sidebar-slide-open": this.isOpen
            }}>
                <div class="sidebar-content">
                    {this.$slots.default}
                </div>
            </aside>
        );
    }
}