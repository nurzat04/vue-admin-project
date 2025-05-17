import request from "../../../utils/request";
import type { TradeMarkResponseData } from "./type";

enum API {
    GET_BRAND_LIST_URL = "/admin/product/baseTrademark/",
    ADD_BRAND_URL = "/admin/product/baseTrademark/save",
    UPDATE_BRAND_URL = "/admin/product/baseTrademark/update",
    DELETE_BRAND_URL = "/admin/product/baseTrademark/remove",
}
//获取品牌列表数据
export const reqHasTrademark = (page: number, limit: number) => request.get<any, TradeMarkResponseData>(API.GET_BRAND_LIST_URL + `${page}/${limit}`);