import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class DropdownDivider extends Vue {

    protected render(h: any) {
        return (
            <div class="dropdown-divider"></div>
        );
    }
}