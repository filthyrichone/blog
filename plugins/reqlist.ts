import Vue from 'vue'
export default (axios: any) => ({
    article(id?: string) {
        return axios({
            url: `/web/article/${id}`
        })
    },
    fetchReplyBycommentId(commentId: string, params: object) {
        return axios({
            url: `/web/reply/${commentId}`,
            method: 'get',
            params
        })
    },
    likeAction(data?: any, method: string = 'post', id?: 'string') {
        return axios({
            url: id ? `/web/like/action/${id}`: '/web/like/action',
            method,
            data 
        })
    },
    like(data?: any, method: string = 'post', id?: 'string') {
        return axios({
            url: id ? `/web/like/${id}`: '/web/like',
            method,
            data 
        })
    },
    user(data?: any, method: string = 'post', id?: 'string') {
        return axios({
            url: id ? `/web/user/info/${id}`: '/web/user/info/',
            method,
            data 
        })
    },
    reply(data?: any, method: string = 'post', id?: 'string') {
        return axios({
            url: id ? `/web/reply/${id}`: '/web/reply',
            method,
            data 
        })
    },
    comment(data?: any, method: string = 'post', id?: 'string', params?: object) {
        return axios({
            url: id ? `/web/comment/${id}`: '/web/comment',
            method,
            data,
            params, 
        })
    },
    logout:() => {
        return axios({
            url:'/auth/logout'
        })
    },
    getUserInfo:(params: object) => {
    return axios({
        url: '/web/user/info',
        params,
        method: 'get',
    })
    }
})