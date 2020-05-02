import { IKeyedCollection } from "app/interfaces/IKeyedCollection";

export class Dictionary<T> implements IKeyedCollection<T>{
    private items:{[index:string]:T}={};
    private count:number=0;
    Add(key: string, value: T) {
        if(!this.ContainsKey(key))
        {
            this.items[key]=value;
            this.count++;
        }
        else{
            throw Error("Key already Exists");
        }
    }
    Remove(key: string): boolean {
        if(this.ContainsKey(key))
        {
            delete this.items[key];
            this.count--;
            return true;
        }
        else{
            throw Error("Key doesnot Exists");
        }
    }
    ContainsKey(key: string): boolean {
        return this.items.hasOwnProperty(key);
    }
    Count(): number {
      return  this.count;
    }
    Item(key: string): T {
        if(this.ContainsKey(key))
        {
            return this.items[key];
        }
        else{
            throw Error("No Key Found");
        }
    }
    Keys(): string[] {
        var keyset:string[] =[];
        for(var key in this.items)
        {
            keyset.push(key);
        }
        return keyset;
    }
    Values(): T[] {
        var keyset:T[] =[];
        for(var key in this.items)
        {
            keyset.push(this.items[key]);
        }
        return keyset;
    }

}