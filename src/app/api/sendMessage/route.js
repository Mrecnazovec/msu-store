// app/api/sendMessage/route.js

export async function POST(req) {
  try {
    const { message } = await req.json();
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const requestData = {
      chat_id: chatId,
      text: message,
    };

    const telegramRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    const result = await telegramRes.json();
    if (result.ok) {
      return new Response(JSON.stringify({ success: true, result }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ success: false, error: 'Ошибка при отправке сообщения' }), {
        status: 500,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Ошибка сервера' }), {
      status: 500,
    });
  }
}
