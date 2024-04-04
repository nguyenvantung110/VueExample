import commonCall from "./common-call";

const resource = "/posts";
export default {
    get(){
        return commonCall.get(`${resource}`);
    }
}