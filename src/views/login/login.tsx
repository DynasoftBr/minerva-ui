import { Component, Vue } from "vue-property-decorator";
import Card from "@/components/ui-elements/card/card";
import InputText from "@/components/forms/input-text/input-text";
import GridRow from "@/components/core/grid/grid-row";
import GridCol from "@/components/core/grid/grid-col";
import Checkbox from "@/components/forms/checkbox/checkbox";
import "./login.scss";

@Component
export default class Login extends Vue {

    protected render(h: any) {
        return (
            <div class="login-page">
                <div class="login-box">
                    <div class="login-logo">
                        <a href="../../index2.html"><b>Minerva</b>UI</a>
                    </div>
                    <Card>
                        <p class="login-box-msg">Sign in to start your session</p>
                        <InputText placeholder="Email" />
                        <InputText placeholder="Password" />
                        <GridRow>
                            <GridCol size={8}>
                                <Checkbox label="Remenber Me" />
                            </GridCol>
                            <GridCol size={4}>
                                <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
                            </GridCol>
                        </GridRow>
                    </Card>
                </div>
            </div>
        );
    }
}