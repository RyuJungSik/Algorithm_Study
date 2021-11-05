function solution(msg) {
    var answer = [];
    const dict=new Map()
    for(let i=1;i<27;i++){
        dict.set(String.fromCharCode(64+i),i)
    }
    
    for(let i=0;i<msg.length;i++){
        let tmp=msg[i]
        while(1){
            if(!dict.has(tmp)){
                dict.set(tmp,dict.size+1)
                answer.push(dict.get(tmp.slice(0,-1)))
                i-=1
                break
            }
            if(i===msg.length-1){
                answer.push(dict.get(tmp))
                break
            }
            tmp+=msg[++i]
        }
    }
    
    return answer;
}
