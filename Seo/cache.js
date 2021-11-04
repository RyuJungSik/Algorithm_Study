function solution(cacheSize, cities) {
    // LRU 알고리즘이란?
    // 메모리 상에서 가장 최근에 사용된 적이 없는 캐시의 메모리부터 대체하며 새로운 데이터로 갱신시켜준다.

    const queue = [];
    const map = new Map();

    let time = 0;

    if (cacheSize === 0) return cities.length * 5;

    cities.forEach((city) => {
        city = city.toUpperCase();

        if (queue.length < cacheSize) {
            if (queue.includes(city)) {
                map.set(city, 0);
                time += 1;
            } else {
                queue.push(city);
                map.set(city, 0);

                for (let el of queue) {
                    map.set(el, map.get(el) + 1);
                }

                time += 5;
            }
        } else {
            !map.has(city) ? map.set(city, 0) : null;
            let isFind = false;
            for (let i = 0; i < queue.length; i++) {
                if (queue[i] === city) {
                    map.set(city, 0);
                    time += 1;
                    isFind = true;
                } else {
                    map.set(queue[i], map.get(queue[i]) + 1);
                }
            }

            if (!isFind) {
                let old = [...map.entries()].reduce((a, b) =>
                    a[1] > b[1] ? a : b
                )[0];

                queue[queue.indexOf(old)] = city;
                map.delete(old);
                time += 5;
            }
        }
    });

    return time;
}

solution(5, [
    'Jeju',
    'Pangyo',
    'Seoul',
    'NewYork',
    'LA',
    'SanFrancisco',
    'Seoul',
    'Rome',
    'Paris',
    'Jeju',
    'NewYork',
    'Rome',
]);
