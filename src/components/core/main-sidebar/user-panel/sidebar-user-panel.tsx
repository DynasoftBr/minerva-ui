import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class SidebarUserPanel extends Vue {

    @Prop()
    public userName!: string;

    @Prop()
    public userAvatar!: string;

    @Prop({ default: false })
    public useInitials!: boolean;

    public getInitials() {
        const canvas = document.createElement("canvas");
        canvas.style.display = "none";
        canvas.width = 30;
        canvas.height = 30;
        document.body.appendChild(canvas);

        const context = canvas.getContext("2d") as CanvasRenderingContext2D;
        context.fillStyle = "#999";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = "16px Arial";
        context.fillStyle = "white";

        const name = {
            first: this.userName ? this.userName.split(" ")[0] : "A",
            last: this.userName ? this.userName.split("")[1] : "null"
        };

        if (name.first && name.first !== "") {
            let first: string;
            let last: string;

            first = name.first[0];
            last = name.last && name.last !== "" ? name.last[0] : "";
            if (last) {
                const initials = first + last;
                context.fillText(initials.toUpperCase(), 5, 21);
            } else {
                const initials = first;
                context.fillText(initials.toUpperCase(), 10, 21);
            }

            const data = canvas.toDataURL();
            document.body.removeChild(canvas);

            return data;
        } else {
            return false;
        }
    }

    protected render(h: any) {
        return (
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <div class="image">
                    <img class="img-circle elevation-2" alt="User Image" />
                </div>
                <div class="info">
                    <a href="#" class="d-block">Alexander Pierce</a>
                </div>
            </div>
        );
    }
}