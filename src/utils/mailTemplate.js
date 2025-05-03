// 이메일 HTML 템플릿 작성

// 질문 발송 이메일
export function questionEmail({ answerUrl, questionText, category, profileUrl }) {
    return `
  <head>
    <meta charset="UTF-8">
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; background-color: #ffffff;">
    <table width="500" align="center" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #dbe5ff; border-radius: 20px; padding: 20px; box-sizing: border-box;">
      <!-- 로고 -->
      <tr>
        <td style="padding-bottom: 20px;" align="left">
          <img src="https://raw.githubusercontent.com/KNU-Capstone-Design/KNU_Capstone_Frontend/main/src/assets/logo.png" alt="면도 로고" width="60" style="display: block;" />
        </td>
      </tr>

      <!-- 질문 -->
      <tr>
        <td style="border: 1px solid #dbe5ff; border-radius: 20px; padding: 20px; text-align: center; font-size: 15px; line-height: 1.8; color: #000000;">
          <div style="font-size: 20px; font-weight: bold; margin-bottom: 16px; color: #5B9CFE">오늘의 질문</div>
          <div style="font-size: 13px; color: #5B9CFE; font-weight: bold; margin-bottom: 10px;">
            💡 <span style="color: #5B9CFE;">${category}</span>에 관련된 질문이에요
          </div>
          <div style="font-size: 14px;">
            ${questionText}
          </div>
        </td>
      </tr>

      <!-- 버튼 -->
      <tr>
        <td style="padding-top: 10px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="33%"></td>
              <td width="34%" align="center" style="text-align: center;">
                <!-- 답변하기 버튼 -->
                <a href="${answerUrl}"
                   style="display: inline-block; padding: 10px 16px; background-color: #5B9CFE; color: white; font-size: 0.9rem; border-radius: 6px; font-weight: bold; text-decoration: none;">
                  답변하기
                </a>
              </td>
              <td width="33%" align="right">
                <!-- 내 정보 버튼 -->
                <a href="${profileUrl}"
                   style="display: inline-block; border: 1px solid #dbe5ff; border-radius: 12px; padding: 8px; text-align: center; text-decoration: none;">
                  <div style="font-size: 18px;">👤</div>
                  <div style="font-size: 12px; color: #000000;">내 정보</div>
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  `;
}

// 처음 가입시 발송하는 환영 이메일
export function welcomeEmail(profileUrl) {
    return `
        <head>
        <meta charset="UTF-8">
        </head>
    <body style="margin: 0; padding: 0; font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; background-color: #ffffff;">
    <table width="500" align="center" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #dbe5ff; border-radius: 20px; padding: 20px; box-sizing: border-box;">
        <!-- 로고 -->
        <tr>
            <td style="padding-bottom: 20px;" align="left">
                <img src="https://raw.githubusercontent.com/KNU-Capstone-Design/KNU_Capstone_Frontend/main/src/assets/logo.png" alt="면도 로고" width="60" style="display: block;" />
            </td>
        </tr>

        <!-- 질문-->
        <tr>
            <td style="border: 1px solid #dbe5ff; border-radius: 20px; padding: 20px; text-align: center; font-size: 15px; line-height: 1.8; color: #000000;">
                <div style="font-size: 20px; font-weight: bold; margin-bottom: 16px; color: #5B9CFE">환영합니다!🥳</div>
                <div style="font-size: 14px;">
                    면도는 여러분의 면접 성공을 위한 든든한 파트너입니다.<br/>
                    지금부터 시작되는 면접 여정, 면도가 함께하겠습니다.<br/>
                    함께 목표를 향해 한 걸음씩 나아가 봅시다!!
                </div>
            </td>
        </tr>

        <!-- 버튼 -->
        <tr>
            <td style="padding-top: 10px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td width="33%" align="right">
                            <!-- 내 정보 버튼 -->
                            <a href="${profileUrl}"
                               style="display: inline-block; border: 1px solid #dbe5ff; border-radius: 12px; padding: 8px; text-align: center; text-decoration: none;">
                                <div style="font-size: 18px;">👤</div>
                                <div style="font-size: 12px; color: #000000;">내 정보</div>
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    </body>
  `;
}