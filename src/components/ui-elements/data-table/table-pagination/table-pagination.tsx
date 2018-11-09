import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class TablePagination extends Vue {

    @Prop({ default: 1 })
    public startPage: number;

    @Prop({ default: 12 })
    public totalItems: number;

    @Prop({ default: 10 })
    public itemsPage: number;

    protected render(h: any) {

        return <div class="row no-gutters paging-footer">
            <div class="col-md-5"></div>
            {this.itemsPage < this.totalItems &&
                <div class="col-md-7">
                    <div class="row no-gutters">
                        <div class="col paging-info">
                            <span>
                                {this.message}
                            </span>
                        </div>
                        <div class="col-sm-12 col-md-auto d-flex justify-content-center">
                            <ul class="pagination pagination-sm float-md-right">
                                <li class="page-item"><a class="page-link" href="#">«</a></li>

                                {this.pageItems()}

                                <li class="page-item"><a class="page-link" href="#">»</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </div>;
    }

    private get totalPages(): number {
        return Math.ceil(this.totalItems / this.itemsPage);
    }

    private pageItems() {
        const items = [];
        for (let idx = 0; idx < this.totalPages; idx++) {
            items.push(<li class={{ "page-item": true, active: idx + 1 == this.startPage }}>
                <a class="page-link" href="#">{idx + 1}</a></li>);
        }

        return items;
    }

    private get message(): string {
        // If is the last page the last item is the total items.
        const lastPageItem = this.startPage === this.totalPages ? this.totalItems
            : this.startPage * this.itemsPage;

        const firstPageItem = (this.startPage * this.itemsPage) - (this.itemsPage - 1);

        return `Showing ${firstPageItem} ` + `to ${lastPageItem} of ${this.totalItems} entries`;
    }

}