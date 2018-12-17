import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import TransitionExpand from "@/components/transitions/transition-expand/transition-expand";

@Component
export default class CollapsibleContent extends Vue {

    @Prop({ default: false })
    public show: boolean;

    protected render(h: any) {
        return (
            <div class="collapsible">
                <TransitionExpand>
                    {this.show &&
                        <div class="collapsible-content">
                            {this.$slots.default}
                        </div>
                    }
                </TransitionExpand>
            </div>
        );
    }
}