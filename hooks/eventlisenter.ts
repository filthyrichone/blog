export default function(params: Array<{eventType: string, cb: (...arg: any[]) => void}>) {
    return {
        bind(el: HTMLElement, binding: any) {
            for (const item of params) {
                el.addEventListener(item.eventType, item.cb);
            }
        },
        unbind(el: HTMLElement, binding: any) {
            for (const item of params) {
                el.removeEventListener(item.eventType, item.cb);
            }
        }
    }
} 