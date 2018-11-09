import { Component, Vue } from "vue-property-decorator";

@Component
export default class NavDropdownDivider extends Vue {

    protected render(h: any) {
        return (
            <div class="dropdown-divider"></div>
        );
    }
}