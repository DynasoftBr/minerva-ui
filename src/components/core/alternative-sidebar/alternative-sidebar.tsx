import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class AlternativeSidebar extends Vue {

    protected render(h: any) {
        return (
            <aside class="control-sidebar control-sidebar-dark">
                <div class="p-3">
                    <h5>Title</h5>
                    <p>Sidebar content</p>
                </div>
            </aside>
        );
    }
}