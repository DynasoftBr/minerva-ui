import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import InputMask from "../input-mask/input-mask";

import "./input-number.scss";

@Component
export default class InputNumber extends Vue {

    @Prop({ default: 1 })
    public step: number;

    @Prop({ default: true })
    public showSpinner: boolean;

    @Prop()
    public min: number;

    @Prop()
    public max: number;

    @Prop({ default: true })
    public thousandsSeparator: boolean;

    @Prop({ default: false })
    public readonly: boolean;

    @Prop({ default: false })
    public disabled: boolean;

    @Prop()
    public value: number;

    @Prop()
    public placeholder: string;

    @Prop()
    public label: string;

    public internalValue: number = null;

    public get fixedPoint(): string {
        return this.internalValue != null ? this.internalValue.toFixed(this.precision) : undefined;
    }

    @Watch("value")
    protected onValueChange() {
        this.internalValue = this.value;
    }

    protected mounted() {
        // if (this.showSpinner) {
        //     // const spinner = this.$refs.spinner as HTMLElement;

        //     // spinner.style.height = (this.$refs.inputMask as InputMask).inputEl.offsetHeight + "px";
        // }
    }

    protected render(h: any) {
        return (
            <div class="input-number">
                <InputMask
                    readonly={this.readonly}
                    disabled={this.disabled}
                    placeholder={this.placeholder}
                    label={this.label}
                    mask={{
                        alias: this.precision > 0 ? "decimal" : "integer",
                        digits: this.precision,
                        digitsOptional: this.precision === 0,
                        radixPoint: ",",
                        groupSeparator: this.thousandsSeparator ? "." : undefined,
                        autoGroup: this.thousandsSeparator,
                    }}
                    value={this.internalValue}
                    onInput={(e, val, unmaskedVal) => this.onInput(e, val, unmaskedVal)}
                    ref="inputMask"
                >
                    {this.appendContent()}
                </InputMask>
            </div>
        );
    }

    private appendContent() {
        if (this.showSpinner) {
            return (
                <div class="btn-group-vertical spinner" ref="spinner" slot="append">
                    <button type="button"
                        class="btn btn-default btn-sm"
                        onClick={() => this.increment()}>+</button>
                    <button type="button"
                        class="btn btn-default btn-sm"
                        onClick={() => this.decrement()}>-</button>
                </div>
            );
        }
    }

    private get precision(): number {
        const a = this.step;

        if (!isFinite(a)) return 0;

        let e = 1;
        let p = 0;

        while (Math.round(a * e) / e !== a) { e *= 10; p++; }

        return p;
    }

    @Emit("input")
    private onInput(e: CustomEvent, val: string, unmaskedVal: number): any {
        this.internalValue = unmaskedVal;
    }

    @Emit("input")
    private increment() {
        if (this.internalValue == null) this.internalValue = this.max || 0;
        if (this.internalValue === this.max) return;

        return this.internalValue += this.step;
    }

    @Emit("input")
    private decrement() {
        if (this.internalValue == null) this.internalValue = this.min || 0;
        if (this.internalValue === this.min) return;

        return this.internalValue -= this.step;
    }
}