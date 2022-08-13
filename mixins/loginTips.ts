export default {
  methods: {
    loginTip(this: any) {
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', {}, [
          '您尚未登录，请登录后评论，点击',
          h(
            'a',
            {
              class: 'comment-jumpto-login',
              attrs: {
                href: `http://auth.hyong1232.com:8083?refer=${location.href}`,
              },
            },
            '此处'
          ),
          '登录',
        ]),
        confirmButtonText: 'cancle',
      })
    },
  },
}
