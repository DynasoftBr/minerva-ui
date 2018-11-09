import { Component, Prop, Vue } from "vue-property-decorator";
import { Indeterminate } from "./directives/indeterminate";

@Component({
    directives: {
        indeterminate: Indeterminate
    }
})
export default class Checkbox extends Vue {

    @Prop()
    public label: string;

    @Prop({ default: false })
    public value: boolean;

    @Prop()
    public name: string;

    @Prop({ default: false })
    public disabled: boolean;

    @Prop({ default: true })
    public hasIndeterminate: boolean;

    protected render(h: any) {
        return (
            <div class="pretty p-icon p-smooth" {...{
                class: {
                    "p-has-indeterminate": this.hasIndeterminate
                }
            }}>
                <input name={this.name} type="checkbox"
                    checked={this.value || null}
                    disabled={this.disabled ? "disabled" : null}
                    onChange={(e) => this.updateValue(e)} ref="checkbox" />

                <div class="state">
                    <i class="icon fa fa-check"></i>
                    <label>{this.label}</label>
                </div>

                {this.hasIndeterminate &&
                    <div class="state p-is-indeterminate">
                        <i class="icon fa fa-minus"></i>
                        <label>{this.label}</label>
                    </div>
                }
            </div>
        );
    }

    private updateValue(e) {
        this.$emit("input", e.target.checked);
        this.$emit("change", e.target.checked);
    }

}