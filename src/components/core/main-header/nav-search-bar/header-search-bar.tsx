import { Component, Vue } from "vue-property-decorator";
import NavItem from "@/components/core/main-header/nav-item/nav-item";

@Component
export default class NavSearchBar extends Vue {

    protected render(h: any) {
        return (
            <NavItem>
                <form class="form-inline ml-3">
                    <div class="input-group input-group-sm">
                        <input class="form-control form-control-navbar" type="search"
                            placeholder="Search" aria-label="Search" />
                        <div class="input-group-append">
                            <button class="btn btn-navbar" type="submit">
                                <i class="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </NavItem>
        );
    }
}