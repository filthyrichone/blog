import Vue from 'vue';
declare module "*.vue" {
    export default Vue;
}

declare module 'vue/types/vue' {
    interface vue {
        fetch: Function;
        asyncData: Function;
        layout: string;
    }
}

declare module "vue/types/options" {
    interface ComponentOptions<V extends Vue> {
        layout?: string;
    }
}