/*
  한국시간대의 현재 날짜를 반환하는 함수
 */

export function getKSTDateString(offsetDays = 0) {
    const now = new Date();

    // UTC → KST (+9시간)
    const kst = new Date(now.getTime() + (9 * 60 * 60 * 1000));

    // 오프셋 적용 (어제: -1, 오늘: 0)
    kst.setDate(kst.getDate() + offsetDays);

    // YYYY-MM-DD 형식으로 반환
    const year = kst.getFullYear();
    const month = String(kst.getMonth() + 1).padStart(2, '0');
    const date = String(kst.getDate()).padStart(2, '0');

    return `${year}-${month}-${date}`;
}