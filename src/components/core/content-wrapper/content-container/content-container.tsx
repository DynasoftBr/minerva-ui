import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import "./content-container.scss";

@Component({ name: "content-container" })
export default class ContentContainer extends Vue {

    protected render(h: any) {
        return (
            <div class="content container-fluid">
                {this.$slots.default}
            </div>
        );
    }
}