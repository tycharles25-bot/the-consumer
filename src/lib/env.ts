export const env = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'The Consumer',
  themePrimary: process.env.THEME_PRIMARY || '#ff6a00',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  postmarkToken: process.env.POSTMARK_SERVER_TOKEN || '',
  emailFrom: process.env.EMAIL_FROM || 'The Consumer <no-reply@theconsumer.com>',
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    bucket: process.env.AWS_S3_BUCKET || '',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    endpoint: process.env.CLOUDFLARE_R2_ENDPOINT || ''
  },
  tremendous: {
    apiKey: process.env.TREMENDOUS_API_KEY || '',
    fundingSourceId: process.env.TREMENDOUS_FUNDING_SOURCE_ID || ''
  }
};



