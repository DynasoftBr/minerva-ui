import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import { VNode } from "vue";

@Component
export default class InputText extends Vue {

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

    @Prop()
    public tabIndex: number;

    @Prop()
    public autoComplete: boolean;

    @Prop()
    public autoCapitalize: "off" | "none" | "on" | "sentences" | "words" | "characters";

    @Prop()
    public spellCheck: boolean;

    @Prop({ default: "medium" })
    public size: "s" | "m" | "l";

    public get inputEl(): HTMLInputElement {
        return this.$refs.input as HTMLInputElement;
    }

    protected render(h: any) {
        let content = this.inputControl();

        content = this.addOns(content);
        content = this.wrapWithFormGroup(content);
        content = this.wrapWithComponentDiv(content);

        return content;
    }

    protected wrapWithComponentDiv(content: JSX.Element) {
        return (
            <div class="input-text">
                {content}
            </div>
        );
    }

    private inputControl() {
        return (
            <input class={{
                "form-control": true,
                "form-control-lg": this.size == "l",
                "form-control-sm": this.size == "s",
            }} type="text" ref="input"
                disabled={this.disabled ? "disabled" : undefined}
                readonly={this.readonly ? "readonly" : undefined}
                value={this.value}
                placeholder={this.placeholder}
                tabindex={this.tabIndex}
                autocomplete={this.autoComplete}
                autocapitalize={this.autoCapitalize}
                spellcheck={this.spellCheck}
                role="textbox"
                onInput={(e) => this.$emit("input", e, e.target.value)} />
        );
    }

    private addOns(input: JSX.Element) {
        const contentPrepend = this.$slots.prepend;
        const contentAppend = this.$slots.append;

        if (contentPrepend || contentAppend) {
            return (
                <div class="input-group">
                    {contentPrepend &&
                        <div class="input-group-prepend">{contentPrepend}</div>}
                    {input}
                    {contentAppend &&
                        <div class="input-group-append">{contentAppend}</div>}
                </div>
            );
        }

        return input;
    }

    private wrapWithFormGroup(content: JSX.Element) {
        return (
            <div class={{ "form-group": true, "no-label": this.label == null }}>
                {this.inputLabel()}
                {content}
            </div>
        );
    }

    private inputLabel() {
        if (this.label) {
            return (
                <label>{this.label}</label>
            );
        }
    }
}