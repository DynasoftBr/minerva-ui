import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { ComponentToRender } from "../models/component-to-render";
import "./selectable-wrapper.scss";

@Component
export default class SelectableWrapper extends Vue {

    @Prop()
    public componentToRender: ComponentToRender;

    public active: boolean = false;

    public btnRemove: boolean = true;
    public btnConfig: boolean = true;

    protected render(h: any) {
        // this.componentToRender.component = this;

        return (
            <div class="selectable-wrapper"
                tabindex="0"
                ref="el"
                onFocus={(e) => this.onFocus(e)}
                onFocusout={(e) => this.onFocusOut(e)}>

                {this.active &&
                    <div class="actions">
                        {this.btnConfig &&
                            <button class="btn btn-sm btn-primary"><i class="fa fa-cog"></i></button>}
                        {this.btnRemove &&
                            <button class="btn btn-sm btn-danger"><i class="fa fa-times"></i></button>}
                    </div>}

                {this.$slots.default}

            </div>
        );
    }

    private onFocus(e: Event): any {
        this.active = true;
        e.stopPropagation();
    }

    private onFocusOut(e: Event): any {
        this.active = false;
        e.stopPropagation();
    }
}