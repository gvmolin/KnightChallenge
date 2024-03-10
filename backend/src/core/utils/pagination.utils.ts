import { BadGatewayException } from "@nestjs/common";
import { Model } from "mongoose";

export interface IPaginationParams{
    limit:number,
    page:number,
    count?:number,
    populate?: string[]
}

enum queryParamsEnum {
    "limit", "page", "populate"
}

export class PaginationUtils<T>{
    private model:Model<T>;
    private params:IPaginationParams
    private result: T[]
    constructor(model:Model<T>, params?:IPaginationParams){
        this.model = model;
        if(params) this.params = params;
    }

    async paginate(params:IPaginationParams){
        this.params = params;
        const found:T[] = await this.model
            .find()
            .skip((this.params.page - 1) * params.limit)
            .limit(this.params.limit)
            .populate(this.params.populate[0] || "")
            .populate(this.params.populate[1] || "")

            return {
                pagination: {
                    ...this.params,
                    count: found.length
                }, 
                result: found,
            }
    }

}

export function paginationParamsDto(params:IPaginationParams){
    if(isObjectEmpty(params)) params = {limit:10, page:1};
    if(
        Number.isNaN(parseInt(`${params.page}`))  || 
        Number.isNaN(parseInt(`${params.limit}`))
    ) throw new BadGatewayException("Incorrect query params!");

    let obj = {
        page: 1, limit: 10
    }

    Object.entries(params).forEach(([key, value])=>{
        if(key in queryParamsEnum) obj[key] = value;
    })    
    if(!params.populate) Object.assign(obj, {populate : []})    

    return obj;

}

function isObjectEmpty(obj: Record<string, any>): boolean {
    return Object.entries(obj).length === 0;
  }