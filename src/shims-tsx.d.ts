import 'vue-tsx-support/enable-check';

import _Vue, { VNode } from "vue";

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode { }
    // tslint:disable no-empty-interface
    interface ElementClass extends _Vue { }
    interface IntrinsicElements {
    }
    interface ElementAttributesProperty {
      $props: {};
    }
  }
}