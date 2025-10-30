import postmark from 'postmark';
import { env } from './env';

export function getPostmark() {
  if (!env.postmarkToken) throw new Error('POSTMARK_SERVER_TOKEN not set');
  return new postmark.ServerClient(env.postmarkToken);
}

export async function sendViewerEmail(to: string, subject: string, html: string, text?: string) {
  const client = getPostmark();
  await client.sendEmail({ From: env.emailFrom, To: to, Subject: subject, HtmlBody: html, TextBody: text });
}



