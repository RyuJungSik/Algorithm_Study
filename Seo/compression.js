function solution(msg) {
    /* 1. 길이가 1인 모든 단어를 포함하도록 사전을 초기화한다.
    2. 사전에서 현재 입력과 일치하는 가장 긴 문자열 w를 찾는다.
    3. w에 해당하는 사전의 색인 번호를 출력하고, 입력에서 w를 제거한다.
    4. 입력에서 처리되지 않은 다음 글자가 남아있다면(c), w+c에 해당하는 단어를 사전에 등록한다.
    5. 단계 2로 돌아간다.
    */
    const dict = [
        -1,
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
    ];

    const word = msg.split('');
    let cur = word[0];
    let isFind = false;
    const answer = [];
    let print = 0;
    let curIdx = 0;

    while (word.length) {
        dict.forEach((char, i) => {
            if (char === cur) {
                print = i;
                isFind = true;
                return;
            }
        });

        if (isFind) {
            curIdx++;
            cur += word[curIdx];
        } else {
            dict.push(cur);
            answer.push(print);
            for (let i = 0; i < cur.length - 1; i++) {
                word.shift();
            }
            cur = word[0];
            print = 0;
            curIdx = 0;
        }

        isFind = false;
    }

    return answer;
}

solution('TOBEORNOTTOBEORTOBEORNOT');
