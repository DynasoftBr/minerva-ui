import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import TabItem from "./tab-item/tab-item";
import "./tab-control.scss";

@Component
export default class TabControl extends Vue {

    @Prop({ default: false })
    public sm: boolean;

    @Prop()
    public height: number;

    private children: Vue[] = [];

    private activeTab: TabItem = this as any;

    protected created() {
        this.children = this.$children;
    }

    protected mounted() {
        this.activeTab = this.children[0] as TabItem;
        this.activeTab.setActive();
    }

    protected render(h: any) {
        this.setActiveTab();

        return (
            <div class={{ "tab-control": true, "tab-sm": this.sm }}>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    {this.children.map((item: TabItem, idx: number) => {
                        return (
                            <li class="nav-item" role="tab">
                                <button type="button"
                                    class={{
                                        "btn-link": true,
                                        "nav-link": true,
                                        "active": this.activeTab == item
                                    }} onClick={(e: Event) => this.tabClick(e, item)}>{item.title}</button>
                            </li>
                        );
                    })}
                </ul>
                <div class="tab-content border border-top-0" style={{ "height": this.height && `${this.height}px` }}>
                    {this.$slots.default}
                </div>
            </div>
        );
    }

    private tabClick(e: Event, tab: TabItem): any {
        e.preventDefault();
        e.stopPropagation();

        if (tab != this.activeTab) {
            this.activeTab.setInactive();
            tab.setActive();
            this.activeTab = tab;
        }
    }

    private setActiveTab(): any {
        const item = this.children.find((tab: TabItem) => tab.active == true);
        if (item) {
            this.activeTab = item as TabItem;
        }
    }
}