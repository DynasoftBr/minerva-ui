import { Component, Vue, Prop } from "vue-property-decorator";
import ControlSidebar from "@/components/core/control-sidebar/control-sidebar";
import AccordionContainer from "@/components/ui-elements/accordion-container/accordion-container";
import AccordionItem from "@/components/ui-elements/accordion-container/accordion-item/accordion-item";
import { SortableDirective } from "../directives/sortable-directive";
import SimpleList from "@/components/ui-elements/simple-list/simple-list";
import Sortable from "sortablejs";
import PaletteListItem from "./palette-list-item/palette-list-item";
import "./sidebar-palette.scss";
import { ComponentToRender } from "../models/component-to-render";

@Component({
    directives: {
        "sortable-directive": SortableDirective
    }
})
export default class SidebarPalette extends Vue {

    public sidebarOpen: boolean = false;

    @Prop({ default: true })
    public sidebarDarkTheme: boolean;

    protected render() {

        return (
            <ControlSidebar
                class="sidebar-palette"
                isOpen={this.sidebarOpen}
                darkTheme={this.sidebarDarkTheme}>

                <button class="btn btn-sm btn-outline-primary toolbox-toggler"
                    onClick={() => this.sidebarOpen = !this.sidebarOpen}>
                    <i class="fa fa-th"></i></button>

                <AccordionContainer allowMultipleOpen={true}>
                    <AccordionItem title="Form Elements" noPadding={true}>
                        <SimpleList>
                            <PaletteListItem draggable={true} component={{ name: "input-text" }}>
                                <i class="fa fa-arrow-down"></i>
                                Imput text
                            </PaletteListItem>
                        </SimpleList>
                    </AccordionItem>
                    <AccordionItem title="Containers" noPadding={true}>
                        <SimpleList>
                            <PaletteListItem draggable={true} component={{
                                name: "grid-row",
                                children: [
                                    { name: "grid-col" },
                                    { name: "grid-col" },
                                    { name: "grid-col" }
                                ]
                            }}>
                                <i class="fa fa-arrow-down"></i>
                                Grid row
                            </PaletteListItem>
                            <PaletteListItem draggable={true} component={{ name: "tab-control" }}>
                                <i class="fa fa-arrow-down"></i>
                                Tabs
                            </PaletteListItem>
                        </SimpleList>
                    </AccordionItem>
                </AccordionContainer>

            </ControlSidebar >
        );
    }
}