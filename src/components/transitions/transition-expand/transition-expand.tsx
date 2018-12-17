import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import "./transition-expand.scss";

@Component
export default class TransitionExpand extends Vue {

    @Prop({ default: 350 })
    public duration: number;

    protected render(h: any) {
        return (
            <transition name="expand"
                onEnter={(el) => this.enter(el)}
                onAfterEnter={(el) => this.afterEnter(el)}
                onLeave={(el) => this.leave(el)}
                duration={this.duration}>

                {this.$slots.default}
            </transition>
        );
    }

    private enter(element) {
        const width = getComputedStyle(element).width;

        element.style.width = width;
        element.style.position = "absolute";
        element.style.visibility = "hidden";
        element.style.height = "auto";

        const height = getComputedStyle(element).height;

        element.style.width = null;
        element.style.position = null;
        element.style.visibility = null;
        element.style.height = 0;

        // Trigger the animation.
        // We use `setTimeout` because we need
        // to make sure the browser has finished
        // painting after setting the `height`
        // to `0` in the line above.
        setTimeout(() => {
            element.style.height = height;
        });
    }

    private afterEnter(element) {
        element.style.height = "auto";
    }

    private leave(element) {
        const height = getComputedStyle(element).height;

        element.style.height = height;

        setTimeout(() => {
            element.style.height = 0;
        });
    }
}