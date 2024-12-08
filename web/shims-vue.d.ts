declare module '*.vue' {

  import { DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>;

  export default component;

}



declare module '@/modules/public/components/BannerComponent.vue' {

  import { DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>;

  export default component;

}
