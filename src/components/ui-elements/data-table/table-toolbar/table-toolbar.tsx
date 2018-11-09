import { Component, Vue, Prop } from "vue-property-decorator";
import { ToolbarButton } from "../models/toolbar-button";

@Component
export default class TableToolBar extends Vue {

    @Prop({ default: true })
    public showFilter: boolean;

    @Prop({ default: () => [] })
    public customButtons: ToolbarButton[];

    protected render(h: any) {
        return (
            <div class="table-toolbar">
                <div class="table-toolbar-grouped-cols">
                </div>
                <div class="table-toolbar-buttons">
                    {this.customButtons.map((btn) => this.buildButton(btn))}
                    {this.buildButton({
                        iconClass: "fa fa-filter",
                        onClick: (e) => console.log("clicked"),
                        label: "teste"
                    })}
                </div>
            </div>
        );
    }

    private buildButton(btn: ToolbarButton) {
        return (
            <button id={btn.id} type="button"
                class="btn btn-outline-info btn-flat"
                onClick={(e: Event) => btn.onClick ? btn.onClick(e) : undefined}>
                {
                    btn.iconClass &&
                    <i class={btn.iconClass}></i>
                }
                <span>{btn.label}</span>
            </button >
        );
    }

}