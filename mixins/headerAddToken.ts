export default {
  methods: {
    addTokenToHeader(this: any) {
      const header = {} as any
      const tokenArr = document.cookie.match(/(?<=token=).+(?=[;]?)/)
      if (tokenArr?.length) {
        header.cookie = `token=${tokenArr[0]}`
        console.log(header);
        return header;
      } else {
        this.loginTip()
      }
    },
  },
}
