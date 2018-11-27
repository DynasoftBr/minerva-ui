import { Component, Vue, Prop, Watch, Emit } from "vue-property-decorator";
import moment, { Moment, relativeTimeThreshold } from "moment";
import "./datetime-picker.scss";
import { ViewMode } from "./models/view-mode";
import DropdownMenu from "@/components/ui-elements/dropdown-menu/dropdown-menu";
import InputNumber from "../input-number/input-number";
import InputMask from "../input-mask/input-mask";
import { Granularity } from "./models/granularity";

moment.locale("ru");

@Component
export default class DateTimePicker extends Vue {

    @Prop({ default: true })
    public autoClose: boolean;

    @Prop()
    public value: Moment;

    @Prop({ default: false })
    public readonly: boolean;

    @Prop({ default: false })
    public disabled: boolean;

    @Prop({ default: moment.localeData().longDateFormat("L") + " " + moment.localeData().longDateFormat("LT") })
    public format: string;

    @Prop({ default: ViewMode.decade })
    public viewMode: ViewMode;

    @Prop({ default: true })
    public showPickerBtn: boolean;

    @Prop({ default: Granularity.time })
    public granularity: Granularity;

    public baseDate = moment();

    public internalValue: Moment = moment();

    public isPickerOpen: boolean = false;

    private weekDaysShort = moment.weekdaysShort(true);

    private internalViewMode: ViewMode = ViewMode.month;

    private collapseToToggle: string = "";

    private hour = moment().hour();

    private minute = moment().minute();

    private parentId: string;

    private collapseCalendarId: string;

    private collapseTimeId: string;

    @Watch("value")
    public onValueChanged(newVal: Date | Moment) {
        this.internalValue = moment(newVal);
    }

    public get currentMonth(): number {
        return this.baseDate.month();
    }

    public get currentYear(): number {
        return this.baseDate.year();
    }

    public get formatedValue(): string {
        return this.internalValue ? this.internalValue.format(this.format) : "";
    }

    public get formatedHour(): string {
        const prefixed = "00" + this.hour;
        return prefixed.substr(prefixed.length - 2);
    }

    public get formatedMinute(): string {
        const prefixed = "00" + this.minute;
        return prefixed.substr(prefixed.length - 2);
    }

    public created() {
        this.internalViewMode = this.viewMode;
        this.internalValue = this.value;
        this.baseDate = this.internalValue || moment();

        const time = moment().format("YYYYMMDDhhmmss");
        this.parentId = "detepicker_" + time;
        this.collapseCalendarId = "datepicker_calendar_" + time;
        this.collapseTimeId = "datepicker_time_" + time;
        this.collapseToToggle = this.collapseTimeId;
    }

    public firstDayMonth(): Moment {
        return this.mountDate(1);
    }

    protected render(h: any) {
        return (
            <div class="dropdown datetime-picker"
                v-click-outside={this.isPickerOpen ? (() => this.close()) : undefined}>
                <InputMask disabled={this.disabled}
                    readonly={this.readonly}
                    value={this.formatedValue}
                    mask={{
                        alias: "datetime",
                        inputFormat: this.getMask(),
                        placeholder: "_",
                        clearIncomplete: true
                    }}>

                    {this.showPickerBtn &&
                        <template slot="append">
                            <span class="input-group-append">
                                <button type="button"
                                    onClick={() => this.show()}
                                    class="btn btn-flat"
                                    disabled={this.disabled ? "disabled" : undefined}>
                                    <span class="fa fa-calendar"></span>
                                </button>
                            </span>
                        </template>
                    }
                </InputMask>

                {this.isPickerOpen && this.renderDropdown()}
            </div>

        );
    }

    private renderDropdown() {
        return (
            <DropdownMenu show={this.isPickerOpen} ref="dropdown">
                <div class="accordion" id={this.parentId}>
                    <div id={this.collapseCalendarId} class="collapse show" aria-labelledby="calendar"
                        data-parent={"#" + this.parentId}>
                        {this.renderCalendar()}
                    </div>
                    {this.granularity == Granularity.time &&
                        <button class="btn btn-light btn-toggler" type="button"
                            data-toggle="collapse"
                            data-target={"#" + this.collapseToToggle} aria-expanded="false"
                            aria-controls="collapseTwo"
                            ref="btnToggleCollapse"
                            onClick={() => this.collapseToToggle = this.collapseToToggle == this.collapseCalendarId ?
                                this.collapseTimeId : this.collapseCalendarId}>
                            <i class="far fa-clock fa-lg"></i>
                        </button>
                    }
                    {this.granularity == Granularity.time &&
                        <div id={this.collapseTimeId} class="collapse" aria-labelledby="time"
                            data-parent={"#" + this.parentId}>
                            {this.renderTimeSelector()}
                        </div>
                    }
                </div>
            </DropdownMenu>
        );
    }

    private renderTimeSelector() {
        return (
            <div class="time-chooser">
                <table>
                    <tr>
                        <td>
                            <button class="btn btn-light" type="button"
                                onClick={() => this.hour < 23 && this.hour++}>
                                <i class="fa fa-angle-up"></i>
                            </button>
                        </td>
                        <td></td>
                        <td>
                            <button class="btn btn-light" type="button"
                                onClick={() => this.minute < 59 && this.minute++}>
                                <i class="fa fa-angle-up"></i>
                            </button>
                        </td>
                        <td rowspan={3}>teste</td>
                    </tr>
                    <tr>
                        <td><InputMask
                            mask={{ alias: "datetime", inputFormat: "HH" }}
                            value={this.formatedHour} /></td>
                        <td><b>:</b></td>
                        <td><InputMask
                            mask={{ alias: "datetime", inputFormat: "MM" }}
                            value={this.formatedMinute} /></td>
                    </tr>
                    <tr>
                        <td>
                            <button class="btn btn-light" type="button"
                                onClick={() => this.hour > 0 && this.hour--}>
                                <i class="fa fa-angle-down"></i>
                            </button>
                        </td>
                        <td></td>
                        <td>
                            <button class="btn btn-light" type="button"
                                onClick={() => this.minute > 0 && this.minute--}>
                                <i class="fa fa-angle-down"></i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <button class="btn btn-light" type="button">
                                <i class="fa fa-check"></i>
                            </button>
                        </td>
                    </tr>
                </table>

            </div >
        );
    }

    private renderCalendar() {
        return (
            <table class="table table-sm year-view calendar">
                <thead>
                    {this.renderTableHead()}
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
            </table>);
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
        if (isDayOff)
            this.baseDate = moment(new Date(date.year(), date.month(), 1));

        this.internalValue = date;

        if (this.granularity == Granularity.day && this.autoClose)
            this.close();
        else if (this.granularity == Granularity.time) {
            const btn = this.$refs.btnToggleCollapse as HTMLButtonElement;
            btn.click();
        }
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

    private renderTableHead() {
        let title: string;
        switch (this.internalViewMode) {
            case ViewMode.month:
                title = this.firstDayMonth().format("MMM YYYY"); break;

            case ViewMode.year:
                title = this.currentYear.toString(); break;

            case ViewMode.decade:
                const firstYear = this.firstYearDecade();
                title = `${firstYear} - ${firstYear + 9}`; break;

            default:
                break;
        }
        const colspan = this.internalViewMode === ViewMode.month ? 7 : 4;

        return (
            <tr>
                <th colspan={colspan}>
                    <table width="100%" height="100%">
                        <thead>
                            <th width="15%" onClick={() => this.navigate("prev")}>&lsaquo;</th>
                            <th onClick={() => this.upViewMode()}>
                                {title}
                            </th>
                            <th width="15%" onClick={() => this.navigate("next")}>&rsaquo;</th>
                        </thead>
                    </table>
                </th>
            </tr>
        );
    }

    private navigate(dir: "next" | "prev") {
        const func = (amount: number, unit: moment.unitOfTime.DurationConstructor) => {
            if (dir == "next")
                return moment(this.baseDate.add(amount, unit));

            return moment(this.baseDate.subtract(amount, unit));
        };

        switch (this.internalViewMode) {
            case ViewMode.month:
                return this.baseDate = func(1, "months");

            case ViewMode.year:
                return this.baseDate = func(1, "years");

            case ViewMode.decade:
                return this.baseDate = func(10, "years");
        }
    }

    private upViewMode() {
        if (this.internalViewMode == ViewMode.month)
            return this.internalViewMode = ViewMode.year;
        else if (this.internalViewMode == ViewMode.year)
            return this.internalViewMode = ViewMode.decade;
    }

    private mountDate(day: number) {
        return moment(new Date(this.currentYear, this.currentMonth, day));
    }

    private getMask() {
        return this.format
            .replace(new RegExp("D", "g"), "d")
            .replace(new RegExp("Y", "g"), "y")
            .replace(new RegExp("m", "g"), "M");
    }

    @Emit()
    private show() {
        this.isPickerOpen = true;
    }

    @Emit()
    private close() {
        this.isPickerOpen = false;
        this.collapseToToggle = this.collapseTimeId;
    }
}