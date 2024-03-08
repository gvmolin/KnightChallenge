import { BadGatewayException } from "@nestjs/common";
import { Query, Model } from "mongoose";

export interface IPaginationParams{
    limit:number,
    page:number,
    count?:number,
}

enum queryParamsEnum {
    "limit", "page"
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
            .skip((params.page - 1) * params.limit)
            .limit(params.limit);

            return {
                pagination: {
                    ...params,
                    count: found.length
                }, 
                result: found,
              }
    }


}

export function paginationParamsDto(params:IPaginationParams){
    console.log(typeof params.page);
    
    console.log(parseInt(`${params.page}`));
    
    if(
        Number.isNaN(parseInt(`${params.page}`))  || 
        Number.isNaN(`${params.limit}`)
    ) throw new BadGatewayException("Parametros incorretos");

    let obj = {
        page: 1, limit: 10
    }

    

    Object.entries(params).forEach(([key, value])=>{
        if(key in queryParamsEnum) obj[key] = value;
    })

    console.log(obj);
    
    return obj;

}