// 이메일 HTML 템플릿 작성

// 질문 발송 이메일
export function questionEmail({ answerUrl, questionText, category, profileUrl }) {
    const feedbackUrl = process.env.FEEDBACK_FORM_URL || process.env.GOOGLE_FORM_URL;
    const feedbackBlock = feedbackUrl ? `
      <!-- 피드백 안내 -->
      <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="margin-top: 16px;">
        <tr>
          <td style="padding: 8px 0; text-align: center; color: #64748b; font-size: 12px;">
            서비스 개선을 위해 짧은 피드백을 부탁드려요 🙏
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-bottom: 8px;">
            <a href="${feedbackUrl}" style="display: inline-block; padding: 8px 12px; background-color: #eef4ff; color: #2b6cb0; border-radius: 4px; font-weight: 600; font-size: 12px; border: 1px solid #dbe5ff;">
              피드백 남기기 (구글폼)
            </a>
          </td>
        </tr>
      </table>
    ` : '';

    return `
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>면도 - 오늘의 질문</title>
    <style>
      /* 모바일 반응형 */
      @media screen and (max-width: 600px) {
        .container { width: 100% !important; border-radius: 12px !important; }
        .inner { padding: 16px !important; }
        .logo img { width: 48px !important; }
        .title { font-size: 18px !important; }
        .subtitle { font-size: 12px !important; }
        .text { font-size: 13px !important; }
        .actions td { display: block !important; width: 100% !important; text-align: center !important; }
        .btn { display: block !important; width: 100% !important; box-sizing: border-box !important; }
        .profile { display: inline-block !important; margin-top: 8px !important; }
      }
      a { text-decoration: none; }
      img { border: 0; outline: none; text-decoration: none; }
      .btn { background-color: #5B9CFE; color: #ffffff !important; border-radius: 6px; font-weight: bold; }
    </style>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', Arial, sans-serif; background-color: #ffffff;">
    <!-- 아웃터 래퍼: 일부 클라이언트 호환을 위한 100% 폭 테이블 -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
      <tr>
        <td align="center" style="padding: 12px;">
          <!-- 컨테이너: 최대 폭 고정 + 가운데 정렬 -->
          <table class="container" width="600" align="center" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; border: 1px solid #dbe5ff; border-radius: 20px; box-sizing: border-box; background-color: #ffffff;">
            <!-- 로고 -->
            <tr>
              <td class="inner" style="padding: 20px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
                  <tr>
                    <td class="logo" style="padding-bottom: 12px;" align="left">
                      <img src="https://raw.githubusercontent.com/KNU-Capstone-Design/KNU_Capstone_Frontend/main/src/assets/logo.png" alt="면도 로고" width="60" style="display: block; max-width: 100%; height: auto;" />
                    </td>
                  </tr>
                </table>

                <!-- 질문 카드 -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="border: 1px solid #dbe5ff; border-radius: 20px;">
                  <tr>
                    <td style="padding: 20px; text-align: center; font-size: 15px; line-height: 1.8; color: #000000;">
                      <div class="title" style="font-size: 20px; font-weight: bold; margin-bottom: 16px; color: #5B9CFE;">오늘의 질문</div>
                      <div class="subtitle" style="font-size: 13px; color: #5B9CFE; font-weight: bold; margin-bottom: 10px;">
                        💡 <span style="color: #5B9CFE;">${category}</span>에 관련된 질문이에요
                      </div>
                      <div class="text" style="font-size: 14px;">${questionText}</div>
                    </td>
                  </tr>
                </table>

                <!-- 버튼 영역 -->
                <table class="actions" width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="margin-top: 12px;">
                  <tr>
                    <td width="33%"></td>
                    <td width="34%" align="center" style="text-align: center; padding: 6px 0;">
                      <!-- 답변하기 버튼 -->
                      <a href="${answerUrl}"
                         class="btn"
                         style="display: inline-block; padding: 12px 18px; background-color: #5B9CFE; color: white; font-size: 14px; border-radius: 6px; font-weight: bold; text-decoration: none;">
                        답변하기
                      </a>
                    </td>
                    <td width="33%" align="right" style="padding: 6px 0;">
                      <!-- 내 정보 버튼 -->
                      <a href="${profileUrl}"
                         class="profile"
                         style="display: inline-block; border: 1px solid #dbe5ff; border-radius: 12px; padding: 8px; text-align: center; text-decoration: none;">
                        <div style="font-size: 18px;">👤</div>
                        <div style="font-size: 12px; color: #000000;">내 정보</div>
                      </a>
                    </td>
                  </tr>
                </table>

                ${feedbackBlock}
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>면도 - 환영합니다</title>
    <style>
      @media screen and (max-width: 600px) {
        .container { width: 100% !important; border-radius: 12px !important; }
        .inner { padding: 16px !important; }
        .logo img { width: 48px !important; }
        .title { font-size: 18px !important; }
        .text { font-size: 13px !important; }
        .actions td { display: block !important; width: 100% !important; text-align: center !important; }
        .profile { display: inline-block !important; margin-top: 8px !important; }
      }
      a { text-decoration: none; }
      img { border: 0; outline: none; text-decoration: none; }
    </style>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', Arial, sans-serif; background-color: #ffffff;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
      <tr>
        <td align="center" style="padding: 12px;">
          <table class="container" width="600" align="center" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; border: 1px solid #dbe5ff; border-radius: 20px; box-sizing: border-box; background-color: #ffffff;">
            <!-- 로고 -->
            <tr>
              <td class="inner" style="padding: 20px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
                  <tr>
                    <td class="logo" style="padding-bottom: 12px;" align="left">
                      <img src="https://raw.githubusercontent.com/KNU-Capstone-Design/KNU_Capstone_Frontend/main/src/assets/logo.png" alt="면도 로고" width="60" style="display: block; max-width: 100%; height: auto;" />
                    </td>
                  </tr>
                </table>

                <!-- 환영 카드 -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="border: 1px solid #dbe5ff; border-radius: 20px;">
                  <tr>
                    <td style="padding: 20px; text-align: center; font-size: 15px; line-height: 1.8; color: #000000;">
                      <div class="title" style="font-size: 20px; font-weight: bold; margin-bottom: 16px; color: #5B9CFE;">환영합니다!🥳</div>
                      <div class="text" style="font-size: 14px;">
                        면도는 여러분의 면접 성공을 위한 든든한 파트너입니다.<br/>
                        지금부터 시작되는 면접 여정, 면도가 함께하겠습니다.<br/>
                        함께 목표를 향해 한 걸음씩 나아가 봅시다!!
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- 버튼 영역 -->
                <table class="actions" width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="margin-top: 12px;">
                  <tr>
                    <td width="100%" align="right" style="padding: 6px 0; text-align: right;">
                      <a href="${profileUrl}"
                         class="profile"
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
        </td>
      </tr>
    </table>
  </body>
  `;
}