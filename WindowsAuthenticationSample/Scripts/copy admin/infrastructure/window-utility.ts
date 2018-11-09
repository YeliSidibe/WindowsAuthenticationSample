
export default class WindowUtil {
    static getQueryStringParameter(name: string) {
        let urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
}