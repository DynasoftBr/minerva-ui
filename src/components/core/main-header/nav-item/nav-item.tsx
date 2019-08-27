import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class NavItem extends Vue {
  @Prop({ default: false })
  public dropdown!: boolean;

  @Prop({ default: false })
  public hideOnSmallScreen!: boolean;

  protected render(h: any) {
    return (
      <li
        class={{
          "nav-item": true,
          dropdown: this.dropdown,
          "d-none": this.hideOnSmallScreen,
          "d-sm-inline-block": true
        }}
      >
        {this.$slots.default}
      </li>
    );
  }
}
