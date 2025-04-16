// 이메일 HTML 템플릿 작성

// 질문 발송 이메일
export function questionEmail({ answerUrl, questionText }) {
    return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>질문이 도착했습니다!</h2>
      <h3>질문:${questionText}</h3>
      <p>아래 버튼을 눌러 질문에 답변해주세요:</p>
      <a href="${answerUrl}" style="
        display: inline-block;
        background-color: #007BFF;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        text-decoration: none;
      ">답변하기</a>
    </div>
  `;
}

// 처음 가입시 발송하는 환영 이메일
export function welcomeEmail() {
    return `
     <head>
    <meta charset="UTF-8">
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="400" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #dbe5ff; border-radius: 20px; padding: 20px; box-sizing: border-box;">
            <tr>
              <td style="padding-bottom: 20px;">
                <img src="https://raw.githubusercontent.com/KNU-Capstone-Design/KNU_Capstone_Frontend/main/src/assets/logo.png" alt="면도 로고" width="60" style="display: block;" />
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid #dbe5ff; border-radius: 20px; padding: 40px 20px; height: auto; text-align: center; font-size: 15px; line-height: 1.8; color: #000000;">
                <div style="font-size: 20px; font-weight: bold; margin-bottom: 16px; color: #5B9CFE">환영합니다! 🥳</div>
                <div style="font-size: 14px">
                    면도는 여러분의 면접 성공을 위한 든든한 파트너입니다.<br/>
                    지금부터 시작되는 면접 여정, 면도가 함께하겠습니다.<br/>
                    함께 목표를 향해 한 걸음씩 나아가 봅시다!!
                </div>
              </td>
            </tr>
            <tr>
              <td align="right" style="padding-top: 30px;">
                <div style="display: inline-block; border: 1px solid #dbe5ff; border-radius: 12px; padding: 10px 15px; text-align: center;">
                  <div style="font-size: 18px;">👤</div>
                  <div style="font-size: 12px; color: #000000;">내 정보</div>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  `;
}