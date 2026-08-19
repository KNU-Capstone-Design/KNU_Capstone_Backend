// 섹션 제목으로 인정할 라벨들 (AI 모델이 표기를 조금씩 바꿔도 인식되도록 여러 형태를 허용)
const SECTION_LABELS = [
    { key: "strengths",    labels: ["잘한 점", "잘한점", "좋은 점", "좋은점"] },
    { key: "improvements", labels: ["부족한 점", "부족한점", "개선점", "개선할 점", "아쉬운 점"] },
    { key: "wrongPoints",  labels: ["틀린 점", "틀린점", "잘못된 점"] }
];

// 마크다운 강조/헤딩/리스트 기호를 제거해 순수 텍스트만 남김
function stripDecorations(line) {
    return line
        .replace(/[*_`~]/g, "")                        // **볼드**, _이탤릭_ 등
        .replace(/^\s*[#>]+\s*/, "")                   // # 헤딩, > 인용
        .replace(/^\s*(?:[-–—•‧·]|\d+[.)])\s*/, "")    // - 항목, 1. 항목
        .replace(/^\s*[\[【(]\s*|\s*[\]】)]\s*$/g, "") // [잘한 점] 형태
        .trim();
}

// 한 줄이 섹션 제목인지 판별. 제목이면 { key, rest }, 아니면 null
function matchSectionHeader(cleanLine) {
    for (const { key, labels } of SECTION_LABELS) {
        for (const label of labels) {
            if (!cleanLine.startsWith(label)) continue;
            const rest = cleanLine.slice(label.length);
            // 라벨만 있거나(콜론 없는 제목) 콜론/공백이 뒤따르는 경우만 제목으로 인정
            if (rest === "" || /^[\s:：]/.test(rest)) {
                return { key, rest: rest.replace(/^\s*[:：]?\s*/, "").trim() };
            }
        }
    }
    return null;
}

// 알 수 없는 제목(예: "추가 조언", "총평")인지 판별 -> 해당 지점에서 현재 섹션을 종료
function looksLikeUnknownHeader(rawLine, cleanLine) {
    if (!cleanLine || cleanLine.length > 20) return false;
    const decorated = /^\s*(?:\*\*|#{1,6}\s|__)/.test(rawLine);
    const endsWithColon = /[:：]\s*$/.test(cleanLine);
    return decorated || endsWithColon;
}

// "없음", "없음." 처럼 내용이 없다는 표시인지 판별
function isEmptyMarker(item) {
    return /^없(음|습니다|다)(?![가-힣])/.test(item) || /^해당\s*없음/.test(item) || /^N\/?A$/i.test(item);
}

/*
 AI한테 받은 피드백을 JSON으로 파싱하는 메소드
 모델이 마크다운(**볼드**, 콜론 생략 등)으로 응답해도 파싱되도록 줄 단위로 처리한다.
*/
export function parseFeedback(text) {
    const result = {
        score: 0,
        strengths: [],
        improvements: [],
        wrongPoints: []
    };

    if (typeof text !== "string" || text.trim() === "") return result;

    // 점수 추출 (콜론/마크다운 유무와 무관하게 매치)
    const scoreMatch = text.match(/점수\s*[:：]?\s*(\d+)/);
    if (scoreMatch) {
        result.score = parseInt(scoreMatch[1], 10);
    }

    let currentKey = null;
    for (const rawLine of text.split(/\r?\n/)) {
        const cleanLine = stripDecorations(rawLine);
        if (cleanLine === "") continue;

        const header = matchSectionHeader(cleanLine);
        if (header) {
            currentKey = header.key;
            if (header.rest) result[currentKey].push(header.rest);
            continue;
        }

        // 점수 줄은 본문에 섞이지 않도록 건너뜀
        if (/^점수\s*[:：]?\s*\d/.test(cleanLine)) continue;

        // 다른 제목이 나오면 현재 섹션 종료 (예: "추가 조언" 이후 문단이 딸려오는 것 방지)
        if (looksLikeUnknownHeader(rawLine, cleanLine)) {
            currentKey = null;
            continue;
        }

        if (currentKey) result[currentKey].push(cleanLine);
    }

    // "없음" 표시와 빈 항목 정리
    for (const { key } of SECTION_LABELS) {
        result[key] = result[key].filter(item => item !== "" && !isEmptyMarker(item));
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

/**
 * 문자열을 JSON 객체로 안전하게 파싱하는 유틸리티 함수
 * @param {string} jsonString - 파싱할 JSON 문자열
 * @param {Object} defaultValue - 파싱 실패 시 반환할 기본값
 * @returns {Object} 파싱된 객체 또는 기본값
 */
export function parseToJSON(jsonString, defaultValue = {}) {
  if (!jsonString) return defaultValue;
  
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error('JSON 파싱 오류:', e);
    return defaultValue;
  }
}