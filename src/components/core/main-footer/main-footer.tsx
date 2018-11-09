import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { AppRootModule } from "@/app-root.module";


@Component
export default class MainFooter extends Vue {

    protected render(h: any) {
        return (
            <footer class="main-footer">
                <div class="float-right d-none d-sm-inline">
                    Minerva interface v{AppRootModule.state.version}
                </div>

                <strong>
                    Copyright &copy; 2017-{new Date().getFullYear()} &nbsp;
                    <a href="https://adminlte.io">Poseidon</a>.
                </strong> All rights reserved.
            </footer>
        );
    }
}