import { Component, Prop, Vue } from "vue-property-decorator";
import "./component-actions.scss";

@Component
export default class ComponentActions extends Vue {

    @Prop()
    public title: string;

    protected render(h: any) {
        return (
            <div class="component-actions">
                <i class="fa fa-cog"></i>
            </div>
        );
    }
}