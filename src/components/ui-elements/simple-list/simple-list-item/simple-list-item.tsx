import { Component, Prop, Vue } from "vue-property-decorator";
import "./simple-list-item.scss";

@Component
export default class SimpleListItem extends Vue {

    protected render(h: any) {
        return (
            <li class="simple-list-item nav-item">
                <span>
                    {this.$slots.default}
                </span>
            </li>
        );
    }
}