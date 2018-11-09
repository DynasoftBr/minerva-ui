import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import moment, { Moment } from "moment";
import "./datetime-picker.scss";
import { ViewMode } from "./models/view-mode";
import DropdownMenu from "@/components/ui-elements/dropdown-menu/dropdown-menu";

moment.locale("ru");

@Component
export default class DateTimePickerCalendar extends Vue {

    @Prop({ default: true })
    public autoClose: boolean;

    @Prop({ default: () => moment() })
    public initilDate: Date | Moment;

    @Prop()
    public value: Moment;

    @Prop({ default: true })
    public readonlyInput: boolean;

    @Prop({ default: false })
    public disabled: boolean;

    @Prop({ default: moment.localeData().longDateFormat("L") + " " + moment.localeData().longDateFormat("LT") })
    public format: string;

    @Prop({ default: ViewMode.decade })
    public viewMode: ViewMode;

    @Watch("value")
    public onValueChanged(newVal: Date | Moment) {
        this.internalValue = value;
    }

    public baseDate = moment();

    public internalValue: Moment = moment();

    private weekDaysShort = moment.weekdaysShort(true);

    private internalViewMode: ViewMode = ViewMode.month;

    public get currentMonth(): number {
        return this.baseDate.month();
    }

    public get currentYear(): number {
        return this.baseDate.year();
    }

    public created() {
        this.baseDate = moment(this.initilDate);
        this.internalViewMode = this.viewMode;
        this.internalValue = this.value;
    }

    public firstDayMonth(): Moment {
        return this.mountDate(1);
    }

    protected render(h: any) {
        return (
            <div class="dropdown datetime-picker" v-click-outside={() => this.dropdownToggle(false)}>
                <div class="input-group">
                    <input class="form-control" type="text" ref="input"
                        disabled={this.disabled ? "disabled" : undefined}
                        readonly={this.readonlyInput ? "readonly" : undefined}
                        value={this.internalValue = this.value} />

                    <span class="input-group-append">
                        <button type="button"
                            onClick={() => this.dropdownToggle(true)}
                            class="btn btn-flat"
                            disabled={this.disabled ? "disabled" : undefined}>
                            <span class="fa fa-calendar"></span>
                        </button>
                    </span>
                </div>

                <DropdownMenu ref="dropdown">
                    <table class="table table-sm year-view">
                        <thead>
                            {this.renderHeaderActions()}
                            {this.internalViewMode == ViewMode.month &&
                                <tr>
                                    {this.weekDaysShort.map((el) => <th>{el}</th>)}
                                </tr>
                            }
                        </thead>
                        <tbody>
                            {this.internalViewMode == ViewMode.month && this.renderDays()
                                || this.internalViewMode == ViewMode.year && this.renderMonths()
                                || this.internalViewMode == ViewMode.decade && this.renderYears()
                            }
                        </tbody>
                        <tfoot>

                        </tfoot>
                    </table>
                </DropdownMenu>
            </div >

        );
    }

    private renderDays() {
        const firstDayMonth = this.firstDayMonth();
        const lastDayMonth = this.firstDayMonth().add(1, "months").subtract(1, "days");

        let currDate = this.firstDayMonth().weekday(0);
        const rows = [];

        while (rows.length < 6) {
            const cols = [];

            for (let dayOfWeek = 0; dayOfWeek <= 6; dayOfWeek++) {
                const dateOff = currDate.isBefore(firstDayMonth) || currDate.isAfter(lastDayMonth);
                const isToday = currDate.isSame(moment(), "day");
                const date = currDate.clone();

                cols.push(
                    <td class={{ "text-off": dateOff, "today": isToday }}
                        onClick={() => this.dayClicked(date, dateOff)}>
                        {currDate.date()}
                    </td>
                );

                currDate = currDate.add(1, "days");
            }

            rows.push(<tr>{cols}</tr>);
        }

        return rows;
    }

    private dayClicked(date: Moment, isDayOff: boolean) {
        if (isDayOff) this.baseDate = moment(new Date(date.year(), date.month(), 1));
        this.updateValue(date);
    }

    private renderMonths() {
        const shortMonthsNames = moment.localeData().monthsShort();
        const rows = [];
        const today = moment();
        const dateToCompare = moment(new Date(this.currentYear, 0, 1));
        let currIdx = 0;

        while (currIdx < 11) {
            const cols = [];

            for (let idx = 0; idx < 4; idx++) {
                const currMonthIdx = currIdx;
                const isCurrMonth = today.isSame(dateToCompare.month(currIdx), "month");

                cols.push(
                    <td class={{ today: isCurrMonth }}
                        onClick={() => this.setMonthView(currMonthIdx)}>
                        {shortMonthsNames[currIdx]}
                    </td>
                );

                currIdx++;
            }

            rows.push(<tr>{cols}</tr>);
        }

        return rows;
    }

    private setMonthView(monthIdx: number) {
        this.internalViewMode = ViewMode.month;
        this.baseDate = moment(this.baseDate.month(monthIdx));
    }

    private renderYears() {
        const firstYearDecade = this.firstYearDecade();
        const lastYearDecade = firstYearDecade + 9;
        const lastYearToShow = lastYearDecade + 1;
        const rows = [];
        const today = moment();
        let currYear = firstYearDecade - 1;

        while (currYear < lastYearToShow) {
            const cols = [];

            for (let idx = 0; idx < 4; idx++) {
                const isTextOff = currYear > lastYearDecade || currYear < firstYearDecade;
                const isCurrYear = currYear == today.year();
                const currYearToSet = currYear;

                cols.push(
                    <td class={{ "text-off": isTextOff, today: isCurrYear }}
                        onClick={() => {
                            this.baseDate = moment(this.baseDate.year(currYearToSet));
                            this.internalViewMode = ViewMode.year;
                        }}>
                        {currYear}
                    </td>
                );
                currYear++;
            }

            rows.push(<tr>{cols}</tr>);
        }

        return rows;
    }

    private firstYearDecade() {
        return Number.parseInt(this.currentYear.toString().replace(/.$/, "0"));
    }

    private renderHeaderActions() {
        let title: string;
        switch (this.internalViewMode) {
            case ViewMode.month:
                title = this.firstDayMonth().format("MMM YYYY"); break;

            case ViewMode.year:
                title = this.currentYear.toString(); break;

            case ViewMode.decade:
                const firstYear = this.firstYearDecade();
                title = firstYear + " - " + (firstYear + 9); break;

            default:
                break;
        }
        const colspan = this.internalViewMode === ViewMode.month ? 7 : 4;

        return (
            <tr>
                <th colspan={colspan}>
                    <table width="100%" height="100%">
                        <thead>
                            <th width="15%" onClick={() => this.movPrev()}>&lsaquo;</th>
                            <th onClick={() => this.upViewMode()}>
                                {title}
                            </th>
                            <th width="15%" onClick={() => this.movNext()}>&rsaquo;</th>
                        </thead>
                    </table>
                </th>
            </tr>
        );
    }

    private movPrev() {
        console.log(this.internalViewMode);
        switch (this.internalViewMode) {
            case ViewMode.month:
                return this.baseDate = moment(this.baseDate.subtract(1, "months"));

            case ViewMode.year:
                return this.baseDate = moment(this.baseDate.subtract(1, "years"));

            case ViewMode.decade:
                return this.baseDate = moment(this.baseDate.subtract(10, "years"));

            default:
                break;
        }
    }

    private movNext() {
        switch (this.internalViewMode) {
            case ViewMode.month:
                return this.baseDate = moment(this.baseDate.add(1, "months"));

            case ViewMode.year:
                return this.baseDate = moment(this.baseDate.add(1, "years"));

            case ViewMode.decade:
                return this.baseDate = moment(this.baseDate.add(10, "years"));

            default:
                break;
        }
    }

    private upViewMode() {
        switch (this.internalViewMode) {
            case ViewMode.month:
                return this.internalViewMode = ViewMode.year;

            case ViewMode.year:
                return this.internalViewMode = ViewMode.decade;

            default:
                break;
        }
    }

    private mountDate(day: number) {
        return moment(new Date(this.currentYear, this.currentMonth, day));
    }

    private dropdownToggle(val: boolean) {
        if (val)
            (this.$refs.dropdown as DropdownMenu).show();
        else
            (this.$refs.dropdown as DropdownMenu).close();
    }

    private updateValue(value: Moment) {
        const input = this.$refs.input as HTMLInputElement;

        input.value = value.format(this.format);
        this.$emit("input", input.value);
        this.$emit("change", input.value);

        if (this.autoClose) {
            this.dropdownToggle(false);
        }
    }
}