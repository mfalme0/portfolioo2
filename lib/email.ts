import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@yourdomain.com';

interface TicketInfo {
  ticketNumber: string;
  ticketName: string;
  attendeeName: string;
  qrCodeData: string;
}

interface OrderConfirmationParams {
  to: string;
  customerName: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  tickets: TicketInfo[];
  totalAmount: string;
  currency: string;
  orderId: string;
}

export async function sendOrderConfirmation(params: OrderConfirmationParams) {
  const { to, customerName, eventTitle, eventDate, eventLocation, tickets, totalAmount, currency, orderId } = params;

  const ticketsHtml = tickets.map(t => `
    <tr style="border-bottom:1px solid #2a2a2a;">
      <td style="padding:14px 10px;font-family:monospace;color:#00ff88;font-size:13px;">${t.ticketNumber}</td>
      <td style="padding:14px 10px;color:#e2e8f0;font-size:13px;">${t.ticketName}</td>
      <td style="padding:14px 10px;color:#94a3b8;font-size:13px;">${t.attendeeName}</td>
      <td style="padding:14px 10px;text-align:center;">
        <div style="background:#0a0a0b;padding:10px;border-radius:4px;border:1px solid #2a2a2a;display:inline-block;">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${encodeURIComponent(t.qrCodeData)}" 
               alt="QR Code" style="width:110px;height:110px;border-radius:2px;display:block;" />
        </div>
      </td>
    </tr>
  `).join('');

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#050505;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050505;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0a0a0b,#1a0a0a);padding:48px 32px 40px;border:1px solid #2a2a2a;border-bottom:none;text-align:center;">
              <div style="display:inline-block;width:12px;height:12px;background:#00ff88;border-radius:50%;margin-bottom:16px;"></div>
              <div style="font-size:11px;letter-spacing:5px;color:#00ff88;text-transform:uppercase;font-weight:700;margin-bottom:12px;">Ticket Confirmation</div>
              <div style="font-size:28px;font-weight:900;color:#ffffff;margin-bottom:4px;letter-spacing:-0.5px;">${eventTitle}</div>
              <div style="height:2px;width:48px;background:#00ff88;margin:16px auto;"></div>
              <div style="color:#6b7280;font-size:13px;font-family:monospace;">ORDER #${orderId.slice(0, 8).toUpperCase()}</div>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="background:#0a0a0b;padding:32px;border:1px solid #2a2a2a;border-top:none;border-bottom:none;">
              <div style="color:#e2e8f0;font-size:16px;margin-bottom:20px;">
                Hey <strong style="color:#00ff88;">${customerName}</strong>,
              </div>
              <div style="color:#94a3b8;font-size:14px;line-height:1.7;">
                You're all set for <strong style="color:#ffffff;">${eventTitle}</strong>! 
                Save this email or screenshot the QR codes below — they're your key to entry.
              </div>
            </td>
          </tr>

          <!-- Event Details -->
          <tr>
            <td style="background:#0a0a0b;padding:0 32px;border:1px solid #2a2a2a;border-top:none;border-bottom:none;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #1a1a1a;">
                <tr>
                  <td style="padding:12px 16px;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:2px;width:100px;font-family:monospace;">Date</td>
                  <td style="padding:12px 16px;color:#e2e8f0;font-size:13px;border-left:1px solid #1a1a1a;">${eventDate}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:2px;width:100px;font-family:monospace;border-top:1px solid #1a1a1a;">Location</td>
                  <td style="padding:12px 16px;color:#e2e8f0;font-size:13px;border-left:1px solid #1a1a1a;border-top:1px solid #1a1a1a;">${eventLocation}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:2px;width:100px;font-family:monospace;border-top:1px solid #1a1a1a;">Total</td>
                  <td style="padding:12px 16px;color:#00ff88;font-size:15px;font-weight:700;border-left:1px solid #1a1a1a;border-top:1px solid #1a1a1a;font-family:monospace;">${currency} ${totalAmount}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Tickets -->
          <tr>
            <td style="background:#0a0a0b;padding:32px;border:1px solid #2a2a2a;border-top:none;border-bottom:none;">
              <div style="font-size:16px;font-weight:800;color:#ffffff;margin-bottom:20px;letter-spacing:-0.3px;">Your Tickets</div>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <thead>
                  <tr style="border-bottom:2px solid #00ff88;">
                    <th style="padding:10px;text-align:left;color:#6b7280;font-size:9px;text-transform:uppercase;letter-spacing:2px;font-family:monospace;">Ticket #</th>
                    <th style="padding:10px;text-align:left;color:#6b7280;font-size:9px;text-transform:uppercase;letter-spacing:2px;font-family:monospace;">Type</th>
                    <th style="padding:10px;text-align:left;color:#6b7280;font-size:9px;text-transform:uppercase;letter-spacing:2px;font-family:monospace;">Name</th>
                    <th style="padding:10px;text-align:center;color:#6b7280;font-size:9px;text-transform:uppercase;letter-spacing:2px;font-family:monospace;">QR</th>
                  </tr>
                </thead>
                <tbody>
                  ${ticketsHtml}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0a0a0b;padding:32px;border:1px solid #2a2a2a;border-top:none;text-align:center;">
              <div style="display:inline-block;width:8px;height:8px;background:#00ff88;opacity:0.5;border-radius:50%;margin-bottom:12px;"></div>
              <div style="color:#6b7280;font-size:12px;line-height:1.7;font-family:monospace;">
                Present your QR code at the door for scanning.<br>
                Questions? <a href="mailto:support@lanparty.com" style="color:#00ff88;text-decoration:none;font-weight:600;">support@lanparty.com</a>
              </div>
              <div style="margin-top:16px;padding-top:16px;border-top:1px solid #1a1a1a;color:#4b5563;font-size:10px;font-family:monospace;">
                LAN System v2.0 // End of Line
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Your Tickets for ${eventTitle} are Confirmed!`,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('Email send failed:', error);
    return { success: false, error };
  }
}
