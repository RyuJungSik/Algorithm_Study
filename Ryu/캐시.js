class LRU {
    constructor(max) {
        this.max = max;
        this.cache = new Map();
    }

    get(key) {
        let item = this.cache.get(key);
        if (item) {
            // refresh key
            this.cache.delete(key);
            this.cache.set(key, item);
        }
        return item;
    }

    set(key) {
        // refresh key
        if (this.cache.has(key)) this.cache.delete(key);
        // evict oldest
        else if (this.cache.size == this.max) this.cache.delete(this.first());
        this.cache.set(key, key);
    }

    first() {
        return this.cache.keys().next().value;
    }
}

function solution(cacheSize, cities) {
    var answer = 0;
    let cache = new LRU(cacheSize)
    if (cacheSize===0){
        return 5*cities.length
    }
    for (let element of cities) {
        element=element.toUpperCase()
        if (cache.get(element)===undefined){
            answer+=5
        }else{
            answer+=1
        }
        cache.set(element)
    }
    
    return answer;
}
