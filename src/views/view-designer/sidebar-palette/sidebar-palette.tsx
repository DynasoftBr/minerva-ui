import { Component, Vue, Prop } from "vue-property-decorator";
import ControlSidebar from "@/components/core/control-sidebar/control-sidebar";
import AccordionContainer from "@/components/ui-elements/accordion-container/accordion-container";
import { ComponentDirective } from "../directives/component-directive";
import { DesignComponentFactory } from "../component-factory/design-component-factory";
import "./sidebar-palette.scss";

@Component({
    directives: {
        "component-directive": ComponentDirective
    }
})
export default class SidebarPalette extends Vue {

    public sidebarOpen: boolean = false;

    @Prop({ default: true })
    public sidebarDarkTheme: boolean;

    private factory = new DesignComponentFactory();

    protected render() {

        return (
            <ControlSidebar
                class="sidebar-palette"
                isOpen={this.sidebarOpen}
                darkTheme={this.sidebarDarkTheme}>

                <button class="btn btn-sm btn-outline-primary toolbox-toggler"
                    {...{ class: { active: this.sidebarOpen } }}
                    onClick={() => this.sidebarOpen = !this.sidebarOpen}>
                    <span>Toolbox</span>
                </button>

                <AccordionContainer allowMultipleOpen={true}>
                    {this.$slots.default}
                </AccordionContainer>

            </ControlSidebar >
        );
    }
}