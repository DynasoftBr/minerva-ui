import { Component, Vue, Prop } from "vue-property-decorator";
import timeago from "timeago.js";
import NavDropdownItem from "@/components/core/main-header/nav-dropdown-item/nav-dropdown-item";

@Component
export default class DropdownChatNotification extends Vue {

    @Prop()
    public userName!: string;

    @Prop()
    public message!: string;

    @Prop()
    public dateTime!: Date;

    public get dateTimeAgo(): string {
        return timeago().format(this.dateTime);
    }

    protected render(h: any) {
        return (
            <NavDropdownItem>
                <div class="media">
                    <img src="dist/img/user1-128x128.jpg" alt="User Avatar" class="img-size-50 mr-3 img-circle" />
                    <div class="media-body">
                        <h3 class="dropdown-item-title">
                            {this.userName}
                        </h3>
                        <p class="text-sm">{this.message}</p>
                        <p class="text-sm text-muted" title={this.dateTime}>
                            <i class="fa fa-clock-o mr-1"></i> {this.dateTimeAgo}
                        </p>
                    </div>
                </div>
            </NavDropdownItem>
        );
    }
}