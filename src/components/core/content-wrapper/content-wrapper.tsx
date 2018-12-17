import { Component, Vue, Prop } from "vue-property-decorator";
import "./content-wrapper.scss";

@Component
export default class ContentWrapper extends Vue {

    protected render() {
        return (
            <div class="content-wrapper">
                {this.$slots.default}
            </div>
        );
    }
}