import { Component, Vue, Prop } from "vue-property-decorator";
import Heading from "@/components/ui-elements/heading/heading";
import "./content-header.scss";

@Component
export default class ContentHeader extends Vue {

    @Prop()
    public subTitle!: string;

    protected render(h: any) {
        return (
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <Heading size="2" class="m-0 text-dark">
                                {this.$slots.default}
                                {
                                    this.subTitle &&
                                    <small> {this.subTitle}</small>
                                }
                            </Heading>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}