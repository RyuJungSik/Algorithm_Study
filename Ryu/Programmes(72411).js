function solution(orders, course) {
    var answer = [];
    let allList=new Map();
    
    const choiceOrder=(index,order,courseNumber,curString)=>{
        if(index===order.length+1){
            return
        }else if(curString.length===courseNumber){
            if(allList.has(curString)){
                allList.set(curString, allList.get(curString)+1)
            }else{
                allList.set(curString, 1)
            }
            return
        }else{
            choiceOrder(index+1,order,courseNumber,curString+order[index])
            choiceOrder(index+1,order,courseNumber,curString)
        }
    }
    
    for(let courseNumber of course){
        for (let order of orders){
            let orderList=order.split("")
            orderList.sort()
            choiceOrder(0,orderList,courseNumber,"")
        };
    };
    
    for(let courseNumber of course){
        let maxValue=1
        for(let [key,value] of allList){
            if(key.length===courseNumber && value>maxValue){
                maxValue=value
            }
        }
        if(maxValue===1){
            continue
        }
        for(let [key,value] of allList){
            if(key.length===courseNumber && value===maxValue){
                answer.push(key)
            }
        }
    }
    
    answer.sort()
    return answer;
}
