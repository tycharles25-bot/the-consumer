module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/env.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "env",
    ()=>env
]);
const env = {
    appName: process.env.NEXT_PUBLIC_APP_NAME || 'The Consumer',
    themePrimary: process.env.THEME_PRIMARY || '#ff6a00',
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    twilio: {
        sid: process.env.TWILIO_ACCOUNT_SID || '',
        token: process.env.TWILIO_AUTH_TOKEN || '',
        verifySid: process.env.TWILIO_VERIFY_SID || ''
    },
    postmarkToken: process.env.POSTMARK_SERVER_TOKEN || '',
    emailFrom: process.env.EMAIL_FROM || 'The Consumer <no-reply@theconsumer.com>',
    aws: {
        region: process.env.AWS_REGION || 'us-east-1',
        bucket: process.env.AWS_S3_BUCKET || '',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
    },
    tremendous: {
        apiKey: process.env.TREMENDOUS_API_KEY || '',
        fundingSourceId: process.env.TREMENDOUS_FUNDING_SOURCE_ID || ''
    }
};
}),
"[project]/src/app/api/creatives/submit/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/env.ts [app-route] (ecmascript)");
;
;
const activeByAdvertiser = new Map(); // advertiserId -> creativeId
async function openAiModerate(input) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"] || !('' + process?.env?.OPENAI_API_KEY)) return {
        flagged: false,
        reasons: []
    };
    try {
        const res = await fetch('https://api.openai.com/v1/moderations', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'omni-moderation-latest',
                input
            })
        });
        if (!res.ok) {
            const txt = await res.text();
            console.warn('OpenAI moderation error:', txt);
            return {
                flagged: false,
                reasons: []
            };
        }
        const data = await res.json();
        const result = data?.results?.[0];
        const flagged = !!result?.flagged;
        const reasons = Object.entries(result?.categories || {}).filter(([, v])=>v).map(([k])=>k);
        return {
            flagged,
            reasons
        };
    } catch (e) {
        console.warn('OpenAI moderation request failed:', e);
        return {
            flagged: false,
            reasons: []
        };
    }
}
async function fetchPlainText(url) {
    const res = await fetch(url, {
        headers: {
            'User-Agent': 'TheConsumerBot/1.0 (+https://theconsumer.net)'
        }
    });
    const html = await res.text();
    return html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 12000);
}
async function POST(req) {
    const body = await req.json();
    const { id, advertiserId, videoUrl, title, description, advertiserUrl, quiz } = body || {};
    if (!id || !advertiserId || !videoUrl) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'Missing fields'
    }, {
        status: 400
    });
    // Auto-replace existing active ad instead of requiring pause
    const existingAd = activeByAdvertiser.get(advertiserId);
    if (existingAd && existingAd !== id) {
        console.log(`Replacing existing ad ${existingAd} with new ad ${id} for advertiser ${advertiserId}`);
    }
    // OpenAI text moderation on provided metadata (title/description)
    const textToCheck = [
        title,
        description
    ].filter(Boolean).join('\n');
    const ai = await openAiModerate(textToCheck || '');
    if (ai.flagged) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            id,
            status: 'rejected',
            reasons: ai.reasons
        }, {
            status: 200
        });
    }
    // Optional: website compliance moderation
    if (advertiserUrl && /^https?:\/\//i.test(advertiserUrl)) {
        try {
            const text = await fetchPlainText(advertiserUrl);
            const webCheck = await openAiModerate(text);
            if (webCheck.flagged) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    id,
                    status: 'rejected',
                    reasons: [
                        'website_noncompliant',
                        ...webCheck.reasons
                    ]
                }, {
                    status: 200
                });
            }
        } catch (e) {
            console.warn('Website fetch/moderation failed:', e);
        }
    }
    activeByAdvertiser.set(advertiserId, id);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        id,
        status: 'approved',
        reasons: []
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a409a7d5._.js.map