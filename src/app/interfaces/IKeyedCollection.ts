export interface IKeyedCollection<T>{
    Add(key:string,value: T);
    Remove(key:string):boolean;
    ContainsKey(key:string):boolean;
    Count():number;
    Item(key:string):T;
    Keys():string[];
    Values():T[];
}