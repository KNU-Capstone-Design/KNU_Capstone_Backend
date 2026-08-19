import { describe, it, expect } from 'vitest';
import { parseFeedback } from './parseToJSON.js';

/*
    parseFeedback 회귀 테스트
    실제 openai/gpt-oss-120b 응답을 그대로 사용한다.
*/
describe('parseFeedback', () => {
    it('콜론이 있는 기본 형식을 파싱한다', () => {
        const raw = [
            '점수: 80점  ',
            '잘한 점:  ',
            '- HTTPS가 HTTP에 SSL/TLS 암호화를 추가한다는 핵심 차이를 정확히 언급했습니다.  ',
            '- 기본 포트 번호(HTTP 80, HTTPS 443)를 올바르게 제시했습니다.  ',
            '',
            '부족한 점:  ',
            '- TLS 핸드쉐이크 과정에 대한 설명이 부족합니다.  ',
            '',
            '틀린 점:  ',
            '- 없음 (제시된 내용은 모두 정확합니다).'
        ].join('\n');

        const result = parseFeedback(raw);

        expect(result.score).toBe(80);
        expect(result.strengths).toHaveLength(2);
        expect(result.strengths[0]).toBe('HTTPS가 HTTP에 SSL/TLS 암호화를 추가한다는 핵심 차이를 정확히 언급했습니다.');
        expect(result.improvements).toEqual(['TLS 핸드쉐이크 과정에 대한 설명이 부족합니다.']);
        expect(result.wrongPoints).toEqual([]);
    });

    // 점수만 나오고 피드백이 empty 로 저장되던 실제 버그 케이스
    it('마크다운 볼드 + 콜론 없는 제목도 파싱한다', () => {
        const raw = [
            '**점수: 40점**  ',
            '',
            '**잘한 점**  ',
            '- 프로세스와 스레드의 기본적인 정의를 정확히 제시했습니다.  ',
            '- 스레드가 같은 프로세스 내에서 메모리를 공유한다는 점을 언급했습니다.  ',
            '',
            '**부족한 점**  ',
            '- 컨텍스트 스위칭 비용의 구체적인 이유가 빠졌습니다.  ',
            '',
            '**틀린 점**  ',
            '- "스레드는 메모리를 공유해서 비용이 더 쌉니다"는 표현이 부정확합니다.  ',
            '',
            '**추가 조언**  ',
            '- 답변을 구조화해서 서술하면 논리 흐름이 명확해집니다.  '
        ].join('\n');

        const result = parseFeedback(raw);

        expect(result.score).toBe(40);
        expect(result.strengths).toHaveLength(2);
        expect(result.improvements).toEqual(['컨텍스트 스위칭 비용의 구체적인 이유가 빠졌습니다.']);
        expect(result.wrongPoints).toEqual(['"스레드는 메모리를 공유해서 비용이 더 쌉니다"는 표현이 부정확합니다.']);
    });

    it('알 수 없는 제목 이후의 문단을 마지막 섹션에 섞지 않는다', () => {
        const raw = [
            '점수: 60점',
            '틀린 점:',
            '- 캐시 무효화 전략을 잘못 설명했습니다.',
            '총평:',
            '- 전반적으로 좋은 시도였습니다.'
        ].join('\n');

        expect(parseFeedback(raw).wrongPoints).toEqual(['캐시 무효화 전략을 잘못 설명했습니다.']);
    });

    it('제목과 내용이 같은 줄에 있어도 파싱한다', () => {
        const raw = [
            '점수: 100점',
            '잘한 점: 핵심 개념을 모두 정확히 설명했습니다.',
            '부족한 점: 없음',
            '틀린 점: 없음'
        ].join('\n');

        const result = parseFeedback(raw);

        expect(result.score).toBe(100);
        expect(result.strengths).toEqual(['핵심 개념을 모두 정확히 설명했습니다.']);
        expect(result.improvements).toEqual([]);
        expect(result.wrongPoints).toEqual([]);
    });

    it('내용 줄이 라벨과 비슷하게 시작해도 제목으로 오인하지 않는다', () => {
        const raw = [
            '점수: 20점',
            '틀린 점:',
            '- 잘한 점이 무엇인지 스스로 정리해 보면 좋겠습니다.'
        ].join('\n');

        const result = parseFeedback(raw);

        expect(result.wrongPoints).toEqual(['잘한 점이 무엇인지 스스로 정리해 보면 좋겠습니다.']);
        expect(result.strengths).toEqual([]);
    });

    it('입력이 비었거나 문자열이 아니면 기본값을 반환한다', () => {
        for (const input of [undefined, null, '', 123]) {
            expect(parseFeedback(input)).toEqual({
                score: 0,
                strengths: [],
                improvements: [],
                wrongPoints: []
            });
        }
    });
});
