// Vercel serverless function — the only place holding the Brevo API key.
// admin-crm.html calls this instead of Brevo directly, since a static page
// can never hold a secret without exposing it to anyone who views source.
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.BREVO_API_KEY;
  const fromEmail = process.env.BREVO_FROM_EMAIL;
  const fromName = process.env.BREVO_FROM_NAME || 'BrightPath';

  if (!apiKey || !fromEmail) {
    res.status(500).json({ error: 'Email sending is not configured on the server (missing BREVO_API_KEY or BREVO_FROM_EMAIL).' });
    return;
  }

  const { to, subject, body } = req.body || {};
  if (!to || !subject || !body) {
    res.status(400).json({ error: 'to, subject and body are required.' });
    return;
  }

  try {
    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        sender: { email: fromEmail, name: fromName },
        to: [{ email: to }],
        subject: subject,
        textContent: body,
      }),
    });

    const data = await brevoRes.json().catch(function () { return null; });

    if (!brevoRes.ok) {
      res.status(502).json({ error: 'Brevo rejected the send', detail: data });
      return;
    }

    res.status(200).json({ ok: true, messageId: data && data.messageId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reach Brevo', detail: String(err) });
  }
};
