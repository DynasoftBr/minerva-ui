import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import moment, { Moment } from "moment";


@Component
export default class TimePicker extends Vue {

    @Prop()
    public time: Moment;

    public internalMoment = moment();

    // protected mounted() {
    //     this.internalShow = this.show;
    // }

    // protected updated() {
    //     if (this.show != this.internalShow) {
    //         if (this.show)
    //             this.$emit("show");
    //         else
    //             this.$emit("hide");

    //         this.internalShow = this.show;
    //     }
    // }

    // protected render(h: any) {
    //     return (
    //         <div class={{ "dropdown-menu": true, "show": this.show }}
    //             style={{ width: this.width }}
    //             aria-labelledby="dropdown-menu" >
    //             {this.$slots.default}
    //         </div>
    //     );
    // }

}