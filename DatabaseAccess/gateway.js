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

    create(table, value){
        switch (table){
            case "projects":
                // Horribly inefficient, but enough for simple demo
                var id = 1
                while(true){
                    const prj_id = `PRJ${id}`
                    if(!this.db["projects"].find(it => it.project_id === prj_id)){
                        value.project_id = prj_id
                        this.db["projects"].push(value)
                        console.log(this.db["projects"])
                        return
                    }

                    id += 1
                }
                break;

            default:
                break;
        }
    }
}

let gateway = null
export function Access(){
    if(!gateway)
        gateway = new Gateway()
    return gateway
}