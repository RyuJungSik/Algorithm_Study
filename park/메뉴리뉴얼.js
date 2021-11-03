function getCombinations(arr, num) {
  const results = [];
  if (num === 1) return arr.map((v) => [v]);
  arr.forEach((value, idx, origin) => {
    const rest = origin.slice(idx + 1);
    const combinations = getCombinations(rest, num - 1);
    const attached = combinations.map((comb) => [value, ...comb]);
    results.push(...attached);
  });
  return results;
}
function solution(orders, course) {
  let maxLen = -1;
  const ordersArr = [...orders].map((v) => {
    maxLen = Math.max(maxLen, v.length);
    return v.split("");
  });
  const orderDicts = new Array(maxLen).fill(null).map((v) => ({}));

  const compareOrder = (comb) => {
    return ordersArr.filter((order) => {
      for (let i = 0; i < comb.length; i++) {
        if (!order.includes(comb[i])) return false;
      }
      return true;
    }).length;
  };
  orders.forEach((order) => {
    for (let i = 0; i < order.length; i++) {
      const combinations = getCombinations(order.split("").sort(), 2 + i);
      combinations.forEach((comb) => {
        const count = compareOrder(comb);
        const cook = comb.join("");
        if (count < 2) return;
        orderDicts[i][cook] = count;
      });
    }
  });
  return orderDicts
    .map((dict) => {
      let maxValue = Object.entries(dict).sort((a, b) => b[1] - a[1])[0];
      maxValue = maxValue ? maxValue[1] : 0;
      return Object.entries(dict)
        .sort((a, b) => b[1] - a[1])
        .filter((v) => v[1] >= maxValue)
        .map((v) => v[0]);
    })
    .flat()
    .filter((v) => course.includes(v.length))
    .sort();
}
