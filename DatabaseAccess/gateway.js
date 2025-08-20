import { Load } from "./Mock/io.js";

class Gateway{
    constructor() {      
        this.db = Load()
    }

    get() {
        return this.db
    }

    get(table) {
        return this.db[table]
    }
}

let gateway = null
export function Access(){
    if(!gateway)
        gateway = new Gateway()
    return gateway
}