import { Load } from "./Mock/io.js";
import bcrypt from "bcryptjs";

class Gateway{
    constructor() {      
        this.db = Load()
    }

    get(table) {
        return this.db[table]
    }

    set(table, value){
        if(table === "users"){
            for (var user of value){
                user.password = bcrypt.hashSync(user.password, 8)
            }
        }

        this.db[table] = value
    }
}

let gateway = null
export function Access(){
    if(!gateway)
        gateway = new Gateway()
    return gateway
}