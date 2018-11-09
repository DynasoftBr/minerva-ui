import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ModalDialog extends Vue {


    protected render(h: any) {
        return (
            <div id="my-modal" class="modal fade in">
                <div class="modal-dialog"></div>
                <div class="modal-content"></div>
            </div>
        );
    }


}