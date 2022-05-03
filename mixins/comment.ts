export default {
  methods: {
    async likeAction(likeType: 0 | 1, likeObj: object, item: any) {
    //   if (likeType && !item.isLiked) {
    //     item.like++
    //     item.isLiked = true
    //   } else if (!likeType && !item.isUnLiked) {
    //     item.like--
    //     item.isUnLiked = true
    //   } else {
    //     //   TODO handle repeat click
    //   }
      try {
        const params = {
          user: (this as any).userInfo._id,
          likeType,
          article: (this as any).article._id,
          ...likeObj,
        }
        const res = await (this as any).$http.likeAction(params)
        if (res.code === 200 && res.isActive) {
            likeType ? item.like ++ : item.like-- ;
        }
      } catch (err) {
        console.error(err)
      }
    },
  },
}
