import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SimpleList extends Vue {

    protected render(h: any) {
        return (
            <ul class="simple-list nav nav-pills flex-column">
                {this.$slots.default}
            </ul>
        );
    }
}