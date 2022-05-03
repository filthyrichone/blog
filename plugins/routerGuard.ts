export default function({app, store}: any) {
    app.router.beforeEach((to: any, from: any, next: any) => {
        const userinfo = store.getters.getUserInfo
        if (JSON.stringify(userinfo) === '{}') {
            // window.open('http://auth.hyong1232.com:8082')
            next();
        }else {
            next();
        }
    })
}