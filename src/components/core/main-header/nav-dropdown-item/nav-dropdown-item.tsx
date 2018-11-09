import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class NavDropdownItem extends Vue {
    protected render(h: any) {
        return (
            <a href="#" class="dropdown-item">
                {this.$slots.default}
            </a>
        );
    }
}