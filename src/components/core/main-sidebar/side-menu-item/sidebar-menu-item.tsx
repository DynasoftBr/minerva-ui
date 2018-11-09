import { Component, Vue, Prop } from "vue-property-decorator";
import "./styles.scss";

@Component
export default class SidebarMenuItem extends Vue {

    @Prop({ default: false })
    public isActive!: boolean;

    public isMenuOpen: boolean = false;

    @Prop({ default: "" })
    public iconClass!: string;

    @Prop({ default: false })
    public hasChild!: boolean;

    @Prop({ default: 300 })
    public animationSpeed!: number;

    @Prop({ default: true })
    public accordion!: boolean;

    public get iconClasses(): string[] {
        return [
            this.iconClass,
            "nav-icon",
            "fa"
        ];
    }

    protected render(h: any) {
        return (
            <li class={{ "nav-item": true, "menu-open": this.isMenuOpen }} ref="menuItem">
                <a href="#" class={{ "nav-link": true, "active": this.isActive }}
                    onClick={(e) => this.toggle(e)}>
                    <i class={this.iconClasses}></i>
                    <p>
                        {this.$slots.default}
                        {this.hasChild &&
                            <i class="right fa fa-angle-left"></i>
                        }
                    </p>
                </a>
                <transition name="slide" duration="3000">
                    {this.hasChild && this.isMenuOpen &&
                        <ul class="nav nav-treeview" ref="children">
                            {this.$slots["children-items"]}
                        </ul>
                    }
                </transition>
            </li >
        );
    }

    private toggle(e) {
        e.preventDefault();

        // Only if there is children;
        if (!this.hasChild) return;

        if (this.isMenuOpen) {
            this.collapse();
        } else {
            this.expand();
        }
    }

    private collapse() {
        this.isMenuOpen = false;
    }

    private expand() {
        this.isMenuOpen = true;
    }
}