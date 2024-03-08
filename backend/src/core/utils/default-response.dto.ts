export class DefaultResponseDto<T> {

    private data?: T;
    private messages = [];


    public addMessage(message: string, success: boolean) {
        let obj:any = {
            success: success,
            message: message
        }

        this.messages.push(obj)
    }

    public setData(data: T, property = "data") {
        if (typeof data !== "object" || !data) throw new Error("Parâmetro 'data' deve ser necessariamente um Array ou Objeto")

        this[property] = data;
    }

    public getData():T{
        return this.data;
    }

    public getMessages(){
        return this.messages;
    }

}