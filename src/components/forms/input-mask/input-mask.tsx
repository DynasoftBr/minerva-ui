import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import InputText from "../input-text/input-text";
import IptMask from "inputmask";

@Component
export default class InputMask extends Vue {

    @Prop()
    public mask: any;

    @Prop({ default: false })
    public readonly: boolean;

    @Prop({ default: false })
    public disabled: boolean;

    @Prop()
    public value: string;

    @Prop()
    public placeholder: string;

    @Prop()
    public label: string;

    private iptMask: any;

    private internalValue: string = "";

    public get inputEl(): HTMLInputElement {
        return (this.$refs.inputText as InputText).inputEl;
    }

    public unmaskedValue() {
        let val: any;

        if (this.mask.alias == "decimal" || this.mask.alias == "integer") {
            let unmasked = this.inputEl.value;

            if (unmasked != null) {
                if (this.mask.radixPoint !== ".") {
                    unmasked = unmasked.replace(this.mask.radixPoint, ".");
                }

                if (this.mask.autoGroup) {
                    unmasked = unmasked.replace(this.mask.groupSeparator, "");
                }

                val = Number(unmasked);
            }
        } else if (this.inputEl.value != null) {
            val = IptMask.unmask(this.inputEl.value, this.mask);
        }

        return val;
    }

    @Watch("value")
    protected onValueChanged(newValue: any, oldValue: any) {
        if (newValue != this.unmaskedValue()) {
            if (newValue != null && newValue != "") {
                const formatedValue = IptMask.format(newValue, this.mask);

                this.internalValue = formatedValue;
                this.iptMask.setValue(this.inputEl, formatedValue);
            } else {
                this.internalValue = null;
            }
        }
    }

    protected mounted() {
        this.iptMask = new IptMask(this.mask);
        this.iptMask.mask(this.inputEl);

        this.onValueChanged(this.value, null);
    }

    protected render(h) {
        return (
            <div class="input-mask">
                <InputText
                    readonly={this.readonly}
                    disabled={this.disabled}
                    placeholder={this.placeholder}
                    label={this.label}
                    value={this.internalValue}
                    onInput={(e: Event) => this.onInput(e)}
                    ref="inputText"
                >
                    <template slot="prepend">
                        {this.$slots.prepend}
                    </template>
                    <template slot="append">
                        {this.$slots.append}
                    </template>
                </InputText>
            </div >
        );
    }

    protected setMask() {
        if (this.mask == null) return;

        const el = this.inputEl;

        return new IptMask(el, this.mask);
    }

    private onInput(e: Event): any {
        const val = this.unmaskedValue();

        this.internalValue = this.inputEl.value;
        this.$emit("input", e, this.inputEl.value, val);
    }
}