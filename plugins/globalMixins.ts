import Vue from 'vue';

if (!(Vue as any).__my_mixin__) {
    (Vue as any).__my_mixin__ = true;
    Vue.mixin({
        methods: {
            getAuthHeaders() {
                return { Authorization: `token ${document.cookie.replace('token=', '')}`}
            }
        } 
    })
}