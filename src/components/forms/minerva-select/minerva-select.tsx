import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import DropdownMenu from "@/components/ui-elements/dropdown-menu/dropdown-menu";
import DropdownItem from "../dropdown-button/dropdown-item/dropdown-item";
import "./minerva-select.scss";
import InputText from "../input-text/input-text";
import DropdownHeader from "../dropdown-button/dropdown-header/dropdown-header";
import DropdownDivider from "../dropdown-button/dropdown-divider/dropdown-divider";

@Component
export default class MinervaSelect extends Vue {

    @Prop({ default: false })
    public readonly: boolean;

    @Prop({ default: false })
    public disabled: boolean;

    @Prop({ default: () => ["1"] })
    public value: string | any[];

    @Prop()
    public placeholder: string;

    @Prop()
    public label: string;

    @Prop({ default: "display" })
    public displayProp: string;

    @Prop({ default: "value" })
    public valueProp: string;

    @Prop({ default: 0 })
    public minCharSearch: number;

    @Prop({ default: () => (search) => [{ display: "teste", value: "1" }, { display: "teste2", value: "2" }] })
    public items: any[] | ((filter: string) => any[] | Promise<any[]>);

    public isShown = false;

    private internalValue: string | string[] | object | object[] = "";

    private internalItems: string[] | object[] = [];

    private searchTerm: string = "";

    private get multiSelect(): boolean {
        return Array.isArray(this.internalValue);
    }

    public get inputEl(): HTMLInputElement {
        return this.$refs.input as HTMLInputElement;
    }

    public get searchBox(): HTMLInputElement {
        return (this.$refs.searchBox as InputText).inputEl;
    }

    public get inputValue(): string {
        if (typeof this.internalValue == "string") {
            return this.internalValue;
        } else if (typeof this.internalValue == "object" && this.internalValue != null) {
            return this.internalValue[this.displayProp];
        }
    }

    @Watch("value")
    protected onValueChange() {
        this.internalValue = this.value;
    }

    protected created() {
        this.internalValue = this.value;

        if (Array.isArray(this.items)) {
            this.internalItems = this.items;
        }
    }

    protected render(h: any) {
        let content = (
            <div class="form-control form-control-sm" tabindex="0" onFocus={() => this.showDropdown()}>
                {this.multiSelect && this.renderTags()}
                {this.inputControl()}
                {this.renderToggler()}
            </div>
        );

        content = this.wrapWithFormGroup(content);
        content = this.wrapWithComponentDiv(content);

        return content;
    }

    private inputControl() {
        return (
            <input type="search"
                ref="input"
                disabled={this.disabled ? "disabled" : undefined}
                readonly={this.readonly || !this.multiSelect ? "readonly" : undefined}
                value={this.inputValue}
                placeholder={this.placeholder}
                onFocus={() => this.showDropdown()}
                onKeydown={(e) => this.handleTab(e)}
                onInput={(e) => ""} />
        );
    }

    private wrapWithComponentDiv(content: JSX.Element) {
        return (
            <div class="minerva-select" aria-expandable="true"
                v-click-outside={this.isShown ? (() => this.hideDropdown()) : undefined}>
                {content}
                {this.renderDropdown()}
            </div>
        );
    }

    private renderTags() {
        return (
            <ul class="selected-tags">
                {(this.internalValue as any[]).map((el) => {
                    let val;
                    let display;

                    if (typeof el == "object" && el != null) {
                        val = el[this.valueProp];
                        display = el[this.displayProp];
                    } else {
                        display = val = el;
                    }

                    return (
                        <li class="tag">
                            <span onClick={() => this.removeSelected(val)}>x</span>
                            {display}
                        </li>
                    );
                })}
            </ul>
        );
    }

    private renderDropdown() {
        return (
            <DropdownMenu show={this.isShown} ref="dropdown" width="100%"
                onShow={() => this.onDropdownToggle()}
                onHide={() => this.onDropdownToggle()}>
                {this.renderItems()}
            </DropdownMenu>
        );
    }

    private onDropdownToggle(): any {
        if (this.isShown) {
            this.searchBox.focus();
            this.$emit("show");
        } else {
            this.$emit("hide");
        }
    }

    private renderItems() {
        if (this.internalItems.length > 0) {
            const renderedItems = [
                ...this.searchHeader()
            ];

            renderedItems.push(...this.renderIntenalItems());
            return renderedItems;
        } else if (typeof this.items == "function" && this.minCharSearch <= 0) {
            const result = this.items("");

            if (result && Object.prototype.toString.call(result) === "[object Promise]") {
                (result as Promise<[]>).then((items) => {
                    this.internalItems = items;
                });
            } else if (result && Array.isArray(result)) {
                this.internalItems = result;
            } else if (result != null) {
                throw new Error("Result of items function must be an array.");
            }

        } else if (typeof this.items == "function" && this.minCharSearch > 0) {
            return (
                <div><span>waiting...</span></div>
            );
        }

    }

    private searchHeader(): any[] {
        return [
            <DropdownHeader header-small={true}>
                <InputText class="searchbox"
                    tab-index={0}
                    auto-complete="off"
                    auto-capitalize="none"
                    spell-check={false}
                    placeholder="Search..."
                    size="s"
                    ref="searchBox"
                    onInput={(e: KeyboardEvent) => this.searchTerm = (e.target as any).value} />
            </DropdownHeader>,
            <DropdownDivider />
        ];
    }

    private renderIntenalItems() {
        return (this.internalItems as any[]).map((item) => {
            let val: string;
            let display: string;

            if (typeof item == "object") {
                val = item[this.valueProp];
                display = item[this.displayProp];
            } else {
                display = val = item;
            }

            return (
                <DropdownItem data-value={item.value}
                    active={this.isSelected(val)}
                    onClick={(e) => this.itemClick(e, val)}>{display}</DropdownItem>
            );
        });
    }

    private renderToggler(): any {
        return (
            <div class="toggler">
                <span class={{
                    "fa": true, "fa-angle-down": !this.isShown,
                    "fa-angle-up": this.isShown,
                    "disabled": this.readonly || this.disabled
                }}
                    onClick={() => this.inputEl.focus()}></span>
            </div>
        );
    }

    private wrapWithFormGroup(content: JSX.Element) {
        return (
            <div class={{
                "form-group": true,
                "no-label": this.label == null
            }}>
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

    private removeSelected(val: string | object) {
        const idx = (this.internalValue as any[]).indexOf(val);
        if (idx > -1) {
            (this.internalValue as string[]).splice(idx, 1);
        }
    }

    private handleTab(e: KeyboardEvent) {
        const code = (e.keyCode ? e.keyCode : e.which);

        if (code == 9 && !e.ctrlKey && !e.altKey) {
            this.hideDropdown();
        }
    }

    @Emit()
    @Emit("input")
    private itemClick(e: MouseEvent, val: string): any {
        // doing this to avoid flickering the active state.
        let el: Element = e.target as Element;

        if (!el.classList.contains("dropdown-item"))
            el = el.closest(".dropdown-item");

        el.classList.add("active");

        if (Array.isArray(this.internalValue)) {
            const idx = (this.internalValue as any[]).indexOf(val);
            if (idx == -1) {
                (this.internalValue as any).push(val);
            } else {
                this.internalValue.splice(idx, 1);
            }
        } else {
            this.internalValue = val;
            this.isShown = false;
        }
    }

    private isSelected(val) {
        if (Array.isArray(this.internalValue)) {
            return (this.internalValue as any).indexOf(val) > -1;
        } else {
            return val === this.internalValue;
        }
    }

    private showDropdown() {
        if (!this.readonly && !this.disabled && !this.isShown) {
            this.isShown = true;
        }
    }

    private hideDropdown() {
        if (this.isShown) {
            this.isShown = false;
        }
    }
}