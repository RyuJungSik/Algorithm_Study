function solution(cacheSize, cities) {
  let answer = 0;
  let cache = [];
  cities.forEach((city) => {
    const cityLower = city.toLowerCase();
    if (cache.includes(cityLower) && cacheSize !== 0) {
      cache = cache.filter((city) => city !== cityLower);
      cache.push(cityLower);
      answer += 1;
      return;
    }
    if (cache.length === cacheSize) {
      cache.shift();
    }
    cache.push(cityLower);
    answer += 5;
  });
  return answer;
}
