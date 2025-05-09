/*
 AI한테 받은 피드백을 JSON으로 파싱하는 메소드
*/

export function parseFeedback(text) {
    const result = {
        score: 0,
        strengths: [],
        improvements: [],
        wrongPoints: []
    };

    // 점수 추출
    const scoreMatch = text.match(/점수:\s*(\d+)/);
    if (scoreMatch) {
        result.score = parseInt(scoreMatch[1], 10);
    }

    // 섹션 분리
    const sections = text.split(/(잘한 점:|부족한 점:|고칠 점:)/).map(s => s.trim());

    const keyMap = {
        "잘한 점:": "strengths",
        "부족한 점:": "improvements",
        "고칠 점:": "wrongPoints"
    };

    for (let i = 0; i < sections.length; i++) {
        const sectionTitle = sections[i];
        const key = keyMap[sectionTitle];
        if (key && i + 1 < sections.length) {
            const content = sections[i + 1];
            if (content === "없음") {
                result[key] = [];
            } else {
                const items = content.split("\n").map(line => line.trim());
                result[key] = items.map(line => line.replace(/^-\s*/, ""));
            }
            i++;
        }
    }
    return result;
}

/*
 AI가 반환한 정답을 JSON으로 파싱
 */
export function parseAnswer(text) {
    return {
        answer: text
    };
}