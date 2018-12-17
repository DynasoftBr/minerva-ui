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

    @Prop()
    public value: any | any[];

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

    @Prop({ default: true })
    public keepLastSearch: boolean;

    @Prop({ default: true })
    public allowSearch: boolean;

    @Prop()
    public items: any[] | ((filter: string) => any[] | Promise<any[]>);

    @Prop({ default: "m" })
    public size: "s" | "m" | "l";

    public isShown = false;

    private internalValue: any | any[] = "";

    private internalItems: any[] = [];

    private searchTerm: string = "";

    private searching: boolean = false;

    private get multiSelect(): boolean {
        return Array.isArray(this.internalValue);
    }

    public get searchBox(): HTMLInputElement {
        return (this.$refs.searchBox as InputText).inputEl;
    }

    public get inputValue(): string {
        if (!this.multiSelect) {
            if (typeof this.internalValue == "object" && this.internalValue != null) {
                return this.internalValue[this.displayProp];
            } else {
                return this.internalValue;
            }
        }
    }

    public get shouldAllowSearch(): boolean {
        return this.allowSearch && typeof this.items == "function";
    }

    @Watch("value")
    protected onValueChange() {
        this.internalValue = this.value;
    }

    protected created() {
        this.internalValue = this.value;

        if (Array.isArray(this.items)) {

            this.internalItems = this.items;

        } else if (typeof this.items == "function"
            && (!this.allowSearch || this.minCharSearch <= 0)) {

            this.search();
        }
    }

    protected render(h: any) {
        let content = (
            <div class={{
                "form-control": true,
                "form-control-lg": this.size == "l",
                "form-control-sm": this.size == "s",
            }} tabindex="0"
                onClick={(e) => this.onFormControlClick(e)}>
                <div class="content">
                    {this.multiSelect && this.renderTags()}
                    {this.inputValue}
                </div>
                {this.renderToggler()}
            </div>
        );

        content = this.wrapWithFormGroup(content);
        content = this.wrapWithComponentDiv(content);

        return content;
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

    private onFormControlClick(e: Event): any {
        const el = e.target as HTMLElement;
        if (el.classList.contains("form-control")
            || el.classList.contains("content"))
            this.toggleDropdown();
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

    private renderDropdown() {
        return (
            <DropdownMenu show={this.isShown} ref="dropdown"
                onShow={() => this.onDropdownToggle()}
                onHide={() => this.onDropdownToggle()}>
                {this.shouldAllowSearch && this.searchHeader()}
                {this.shouldAllowSearch && (this.searchTerm.length < this.minCharSearch) && this.charsLeftInfo()}
                {this.searching && this.searchingInfo()}
                {this.renderItems()}
            </DropdownMenu>
        );
    }

    private charsLeftInfo(): any {
        return (
            <DropdownHeader>
                <h6>Enter {this.minCharSearch - this.searchTerm.length} or more characters to search...</h6>
            </DropdownHeader>
        );
    }

    private searchingInfo(): any {
        return (
            <DropdownHeader>
                <i class="fas fa-spinner fa-spin"></i><h6>Searching...</h6>
            </DropdownHeader>
        );
    }

    private searchHeader(): any[] {
        return [
            <DropdownHeader header-small={true}>
                <InputText class="searchbox"
                    value={this.searchTerm}
                    tab-index={0}
                    auto-complete="off"
                    auto-capitalize="none"
                    spell-check={false}
                    placeholder="Search..."
                    size={this.size}
                    ref="searchBox"
                    onInput={(e: KeyboardEvent) => this.onSearchInput()} />
            </DropdownHeader>,
            <DropdownDivider />
        ];
    }

    private onSearchInput(): any {
        this.searchTerm = this.searchBox.value;
        if (this.searchTerm.length >= this.minCharSearch) {
            this.search();
        } else {
            this.internalItems = [];
            this.searching = false;
        }
    }

    private renderItems() {

        return (this.internalItems as any[]).map((item) => {
            let display: string;

            if (typeof item == "object") {
                display = item[this.displayProp];
            } else {
                display = item;
            }

            return (
                <DropdownItem
                    aria-selected={this.isSelected(item)}
                    onClick={(e) => this.itemClick(e, item)}>{display}</DropdownItem>
            );
        });
    }

    private renderToggler(): any {
        return (
            <div class="toggler d-flex justify-content-end"
                onClick={(e) => this.toggleDropdown()}>
                <span tabindex="-1" class={{
                    "fa": true, "fa-angle-down": !this.isShown,
                    "fa-angle-up": this.isShown,
                    "disabled": this.readonly || this.disabled
                }}></span>
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

    private search() {

        this.searching = true;

        const result = (this.items as (search) => any)("");

        if (result && Object.prototype.toString.call(result) === "[object Promise]") {

            (result as Promise<any[]>).then((items) => {
                if (this.searching == true) {
                    this.internalItems = items;
                    this.searching = false;
                }
            });

        } else if (result && Array.isArray(result)) {

            this.internalItems = result;
            this.searching = false;

        } else if (result != null) {
            throw new Error("Result of items function must be an array.");
        }
    }

    private itemClick(e: MouseEvent, val: any) {
        if (this.multiSelect) {
            let idx = -1;

            if (typeof val == "object") {
                const found = (this.internalValue as any[]).find((itm) => {
                    return itm[this.valueProp] === val[this.valueProp];
                });

                idx = (this.internalValue as any[]).indexOf(found);
            } else {
                idx = (this.internalValue as any[]).indexOf(val);
            }

            if (idx == -1) {
                (this.internalValue as any).push(val);
            } else {
                this.internalValue.splice(idx, 1);
            }
        } else {
            this.internalValue = val;
            this.isShown = false;
        }

        this.$emit("input", this.internalValue);
    }

    private isSelected(val) {
        if (this.multiSelect) {

            if (typeof val == "object") {
                const found = (this.internalValue as any[]).find((el) => {
                    return el[this.valueProp] === val[this.valueProp];
                });

                return found != null;
            } else {
                return (this.internalValue as any[]).indexOf(val) > -1;
            }
        } else {
            if (typeof val == "object") {
                return this.internalValue[this.valueProp] === val[this.valueProp];
            } else {
                return val === this.internalValue;
            }
        }
    }

    private onDropdownToggle(): any {
        if (this.isShown) {
            if (this.shouldAllowSearch) {
                this.searchBox.focus();
            }
            this.$emit("show");
        } else {
            if (this.shouldAllowSearch && !this.keepLastSearch) {
                this.searchTerm = "";
                this.searching = false;

                if (this.minCharSearch > 0)
                    this.internalItems = [];
            }

            this.$emit("hide");
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

    private toggleDropdown() {
        if (this.isShown)
            this.hideDropdown();
        else
            this.showDropdown();
    }
}