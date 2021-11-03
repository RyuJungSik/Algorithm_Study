function solution(orders, course) {
    // 1. 단품 메뉴의 조합 중 가장 많은 손님의 주문을 받은 메뉴를 코스로 만든다.
    // 2. 이 때 메뉴의 개수는 최소 2개 부터이며, 최소 2명 이상의 손님에게 주문을 받아야 코스가 된다.

    // 주문의 개수를 카운팅 하기 위한 hashmap을 만든다.(0~10, 그 이유는 메뉴의 개수 범위가 2~10이므로)
    // hashmap의 키는 메뉴의 개수가 되고, 값은 객체로 만들어서 각각의 조합을 프로퍼티 키로 만들고 조합 개수를 프로퍼티 값으로 한다.

    const map = new Map();

    for (let i = 0; i < 11; i++) {
        map.set(i, {});
    }

    // 메뉴 개수에 따른 최댓값을 구하기 위해 배열을 만들고 (길이 11짜리), 각각의 인덱스에 최댓값을 담는 용도로 사용한다.
    const maxCnt = Array(11).fill(0);

    // 조합 알고리즘은 크게 3가지 인자를 필요로 한다.
    // 첫번째는 조합을 만들어낼 대상이 되는 문자열(orders 배열의 값)
    // 두번째는 현재 인덱스 위치 (초깃값은 0)
    // 세번째는 조합 후보가 되는 문자열 값 (초깃값은 빈 문자열)

    function comb(str, pos, candi) {
        // 현재 인덱스 위치가 order 위치와 동일하다는 것은 모든 문자열을 확인했다는 의미이므로 종료 조건이다.

        // 먼저 완성된 후보군 문자열의 길이를 저장한다. (그 개수가 2개 이상이어야만 의미있는 값이므로 조건문을 준다.)
        // 맵에서 후보군 길이에 해당하는 값을 탐색하고, 거기서 후보군 문자열이 값으로 있는지 탐색한다. 있으면 그 값의 +1을 가져와 cnt 변수에 저장하고 없으면 1을 저장한다.
        // hashmap에 후보군값을 세팅하고 최댓값 배열에서 해당 길이(인덱스)에 해당하는 값을 갱신한다.
        if (pos >= str.length) {
            let len = candi.length;
            if (len >= 2) {
                let cnt = map.get(len)[candi] ? map.get(len)[candi] + 1 : 1;
                map.get(len)[candi] = cnt;
                maxCnt[len] = Math.max(maxCnt[len], cnt);
            }
            return;
        }

        // 조합을 구하는 경우는 크게 2가지로 나눈다.
        // 다음 인덱스 값을 선택하는 경우, 선택하지 않는 경우로 나뉜다.
        // 선택하지 않는 경우에는 마지막 문자를 제거해야 한다.

        // 선택하는 경우
        comb(str, pos + 1, (candi += str[pos]));
        // 마지막 문자 제거
        candi = candi.slice(0, -1);
        // 선택하지 않는 경우
        comb(str, pos + 1, candi);
    }

    // orders를 반복하면서 조합을 찾는데 그 전에 정렬을 하기 위해서 split.sort.join을 통해 문자열을 정렬후 다시 재조립한다.
    // cur은 초기 후보군 값을 담을 문자열 변수로 선언한다.

    for (let str of orders) {
        const arr = str.split('').sort().join('');

        let cur = '';

        comb(arr, 0, cur);
    }

    // 위 로직을 통해 hashmap에 모든 조합의 경우의 수와 몇 번 반복됐는지, 그리고 최댓값에 대한 값이 구해졌으면 마지막으로 course를 반복하면서
    //메뉴 갯수에 따른 조합중 최댓값을 찾아 배열에 담는다.

    let answer = [];

    for (let len of course) {
        let newCourse = map.get(len);
        for (let key in newCourse) {
            if (newCourse[key] >= 2 && newCourse[key] === maxCnt[len]) {
                answer.push(key);
            }
        }
    }

    // 배열을 마지막으로 정렬한다.

    answer.sort();

    return answer;
}

solution(['ABCFG', 'AC', 'CDE', 'ACDE', 'BCFG', 'ACDEH'], [2, 3, 4]);
// solution(['ABCDE', 'AB', 'CD', 'ADE', 'XYZ', 'XYZ', 'ACD'], [2, 3, 5]);
