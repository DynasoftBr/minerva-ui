import { Component, Vue, Prop } from "vue-property-decorator";
import ControlSidebar from "@/components/core/control-sidebar/control-sidebar";
import AccordionContainer from "@/components/ui-elements/accordion-container/accordion-container";
import { ComponentDirective } from "../directives/component-directive";
import { DesignComponentFactory } from "../component-factory/design-component-factory";
import AccordionItem from "@/components/ui-elements/accordion-container/accordion-item/accordion-item";
import Heading from "@/components/ui-elements/heading/heading";
import "./sidebar-properties.scss";

@Component({
    directives: {
        "component-directive": ComponentDirective
    }
})
export default class SidebarProperties extends Vue {

    public sidebarOpen: boolean = true;

    @Prop({ default: true })
    public sidebarDarkTheme: boolean;

    private factory = new DesignComponentFactory();

    protected render() {

        return (
            <ControlSidebar
                class="sidebar-properties"
                isOpen={this.sidebarOpen}
                darkTheme={this.sidebarDarkTheme}>

                <Heading class="text-secondary" size="6" noMargin={true}><b>Properties</b></Heading>
                <AccordionContainer allowMultipleOpen={true}>
                    <AccordionItem initialShow={true} title={"teste"} noPadding={true}>
                        <table width="100%">
                            <tr>
                                <td class="prop-name">asdasd</td>
                                <td class="prop-value">
                                    <input type="password" class="form-control form-control-sm"
                                        id="inputPassword" placeholder="Password" />
                                </td>
                            </tr>
                            <tr>
                                <td class="prop-name">asdasd</td>
                                <td class="prop-value">
                                    <input type="password" class="form-control form-control-sm"
                                        id="inputPassword" placeholder="Password" />
                                </td>
                            </tr>
                            <tr>
                                <td class="prop-name">asdasd</td>
                                <td class="prop-value">
                                    <input type="password" class="form-control form-control-sm"
                                        id="inputPassword" placeholder="Password" />
                                </td>
                            </tr>
                            <tr>
                                <td class="prop-name">asdasd</td>
                                <td class="prop-value">
                                    <input type="password" class="form-control form-control-sm"
                                        id="inputPassword" placeholder="Password" />
                                </td>
                            </tr>
                            <tr>
                                <td class="prop-name">asdasd</td>
                                <td class="prop-value">
                                    <input type="password" class="form-control form-control-sm"
                                        id="inputPassword" placeholder="Password" />
                                </td>
                            </tr>
                        </table>
                        {/* <form style={{ padding: "10px" }}>
                            <div class="form-group row no-gutters">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Password</label>
                                <div class="col-sm-8">
                                    <input type="password" class="form-control form-control-sm"
                                        id="inputPassword" placeholder="Password" />
                                </div>
                            </div>
                            <div class="form-group row no-gutters">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Password</label>
                                <div class="col-sm-8">
                                    <input type="password" class="form-control form-control-sm"
                                        id="inputPassword" placeholder="Password" />
                                </div>
                            </div>
                            <div class="form-group row no-gutters">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Password</label>
                                <div class="col-sm-8">
                                    <input type="password" class="form-control form-control-sm"
                                        id="inputPassword" placeholder="Password" />
                                </div>
                            </div>
                            <div class="form-group row no-gutters">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Password</label>
                                <div class="col-sm-8">
                                    <input type="password" class="form-control form-control-sm"
                                        id="inputPassword" placeholder="Password" />
                                </div>
                            </div>
                            <div class="form-group row no-gutters">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Password</label>
                                <div class="col-sm-8">
                                    <input type="password" class="form-control form-control-sm"
                                        id="inputPassword" placeholder="Password" />
                                </div>
                            </div>
                            <div class="form-group row no-gutters">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Password</label>
                                <div class="col-sm-8">
                                    <input type="password" class="form-control form-control-sm"
                                        id="inputPassword" placeholder="Password" />
                                </div>
                            </div>
                        </form> */}
                    </AccordionItem>
                </AccordionContainer>

            </ControlSidebar >
        );
    }
}

