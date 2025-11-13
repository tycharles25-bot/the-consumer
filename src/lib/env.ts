export const env = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'The Consumer',
  themePrimary: process.env.THEME_PRIMARY || '#ff6a00',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  postmarkToken: process.env.POSTMARK_SERVER_TOKEN || '',
  emailFrom: process.env.EMAIL_FROM || 'The Consumer <no-reply@theconsumer.com>',
  databaseUrl: process.env.DATABASE_URL || '',
  meta: {
    verifyToken: process.env.META_VERIFY_TOKEN || '',
    appId: process.env.META_APP_ID || '',
    appSecret: process.env.META_APP_SECRET || '',
    accessToken: process.env.META_ACCESS_TOKEN || '',
  },
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



