declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "*.scss";

declare module "*.html" {
  const html: string;
  export default html;
}