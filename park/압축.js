function solution(msg) {
  var answer = [];
  const alphabet = new Array(27)
    .fill(null)
    .map((v, i) => String.fromCharCode(65 + i - 1));

  let j = 1;

  for (let i = 0; i < msg.length; i += j) {
    let curChar = msg[i];
    let nextChar = "";

    for (let k = i + 1; k <= msg.length; k++) {
      nextChar = k !== msg.length ? msg[k] : "";

      if (nextChar == "") {
        answer.push(alphabet.indexOf(curChar));
        return answer;
      }

      if (alphabet.includes(curChar + nextChar)) {
        curChar += nextChar;
      } else {
        if (!alphabet.includes(curChar)) {
          alphabet.push(curChar);
        } else {
          alphabet.push(curChar + nextChar);
        }
        answer.push(alphabet.indexOf(curChar));
        j = k - i;
        break;
      }
    }
  }
  return answer;
}
