import { Component, Vue, Prop } from "vue-property-decorator";
import Card from "../card/card";
import DropdownButton from "@/components/forms/dropdown-button/dropdown-button";
import DropdownItem from "@/components/forms/dropdown-button/dropdown-item/dropdown-item";
import Checkbox from "@/components/forms/checkbox/checkbox";
import DropdownTreeview from "@/components/forms/dropdown-button/dropdown-treeview/dropdown-treeview";
import "./data-filter.scss";

@Component
export default class DataFilter extends Vue {

    protected render(h: any) {
        return (
            <div class="d-flex flex-row filter-condition">
                <div class="p-10 filter-logical-operator align-self-stretch">
                    <span>Pick a variable</span>
                </div>
                <div class="filter-expression flex-grow-1">
                    <div class="row">
                        <div class="col-md-3 filter-field">
                            <div class="input-group">
                                <DropdownButton value="Select...">
                                    <template slot="items">
                                        <DropdownTreeview nodes={[{
                                            text: "1",
                                            icon: "fa fa-dashboard",
                                            open: true,
                                            children: [
                                                {
                                                    text: "2",
                                                    icon: "fa fa-dashboard",
                                                    children: [
                                                        {
                                                            text: "3",
                                                            icon: "fa fa-dashboard",
                                                            children: [
                                                                {
                                                                    text: "4",
                                                                    icon: "fa fa-dashboard"
                                                                },
                                                                {
                                                                    text: "5",
                                                                    icon: "fa fa-dashboard"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }]}></DropdownTreeview>
                                    </template>
                                </DropdownButton>
                            </div>
                        </div>
                        <div class="col-md-3 filter-operator">
                        </div>
                    </div>
                </div>
            </div >
        );
    }


}