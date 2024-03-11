import { BadGatewayException, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";

export interface IPaginationParams{
    limit:number,
    page:number,
    count?:number,
    populate?: string[],
    filter?: string,
    deleted?: string,
}

enum queryParamsEnum {
    "limit", "page", "populate", "filter", "deleted"
}

export class PaginationUtils<T>{
    private model:Model<T>;
    private params:IPaginationParams;
    constructor(model:Model<T>, params?:IPaginationParams){
        this.model = model;
        if(params) this.params = params;
    }

    async paginate(params:IPaginationParams){
        this.params = params;
        const count = await this.model.countDocuments();        
        let filter = {deleted: null};
        if(params.filter){
            const formatedFilters = this.parseFilter(params.filter);
            filter = { ...filter, ...formatedFilters};
        }
        if(params.deleted === "true"){
            filter.deleted = true;
        }
        
        const found:T[] = await this.model
            .find(filter)
            .skip((this.params.page - 1) * params.limit)
            .limit(this.params.limit)
            .populate(this.params.populate[0] || "")
            .populate(this.params.populate[1] || "");

        return {
            pagination: {
                ...this.params,
                count: found.length,
                totalCount: count,
                totalPages: Math.ceil(count / this.params.limit),
                filterObj: filter
            }, 
            result: found,
        };
    }

    private parseFilter(filters:string){
        const splitted$:string[] = filters.split("$");        
        const obj:any = {};
        splitted$.forEach(filter => {
            
            if(filter === "heroes"){
                obj.deleted = true;
                return;
            }
            const splitedFilter = filter.split(":");
            if(splitedFilter.length < 2) throw new NotFoundException("Invalid URL filter format");
            obj[splitedFilter[0]] = splitedFilter[1];
        });
        
        return obj;
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
    const cloned = {...obj};
    delete cloned.populate;
    
    return Object.entries(cloned).length === 0;
  }