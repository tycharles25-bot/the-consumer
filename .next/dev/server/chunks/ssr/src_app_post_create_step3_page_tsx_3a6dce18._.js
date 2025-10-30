module.exports = [
"[project]/src/app/post/create/step3/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CreateStep3
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function CreateStep3() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [file, setFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [duration, setDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [videoUrl, setVideoUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [q1, setQ1] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [q1Type, setQ1Type] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('tf');
    const [q1Options, setQ1Options] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [q1Correct, setQ1Correct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [q2, setQ2] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [q2Type, setQ2Type] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('tf');
    const [q2Options, setQ2Options] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [q2Correct, setQ2Correct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    async function checkDuration(videoFile) {
        return new Promise((resolve, reject)=>{
            const video = document.createElement('video');
            const url = URL.createObjectURL(videoFile);
            video.src = url;
            video.onloadedmetadata = ()=>{
                URL.revokeObjectURL(url);
                resolve(video.duration);
            };
            video.onerror = ()=>reject(new Error('Failed to load video'));
        });
    }
    async function handleFile(e) {
        const f = e.target.files?.[0];
        if (!f) return;
        setError('');
        setFile(f);
        try {
            const d = await checkDuration(f);
            setDuration(d);
            if (d > 30) {
                setError('Video must be 30 seconds or less.');
                setFile(null);
            }
        } catch (e) {
            setError('Could not read video file.');
        }
    }
    async function uploadAndModerate() {
        if (!file || !duration || duration > 30) return;
        setStatus('uploading');
        setError('');
        try {
            // Get presigned URL
            const presignRes = await fetch('/api/storage/presign', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    contentType: file.type || 'video/mp4'
                })
            });
            if (!presignRes.ok) {
                const presignError = await presignRes.json();
                throw new Error(`Failed to get upload URL: ${presignError.error || 'Unknown error'}`);
            }
            const { url: uploadUrl, key } = await presignRes.json();
            // Upload to S3 (or mock in development)
            // If it's a mock URL, skip the upload
            if (!uploadUrl.includes('mock-storage.localhost')) {
                const uploadRes = await fetch(uploadUrl, {
                    method: 'PUT',
                    headers: {
                        'content-type': file.type || 'video/mp4'
                    },
                    body: file
                });
                if (!uploadRes.ok) {
                    throw new Error('Failed to upload video to storage');
                }
            }
            setVideoUrl(key);
            // Start moderation
            setStatus('moderating');
            const creativeId = 'cr_' + Date.now();
            // Get localStorage values safely
            let advertiserId = 'unknown';
            let title = '';
            let description = '';
            let advertiserUrl = '';
            let quiz = undefined;
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const modRes = await fetch('/api/creatives/submit', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    id: creativeId,
                    advertiserId,
                    videoUrl: key,
                    title,
                    description,
                    advertiserUrl,
                    quiz
                })
            });
            if (!modRes.ok) {
                const modError = await modRes.json();
                throw new Error(`Moderation failed: ${modError.error || 'Unknown error'}`);
            }
            const modData = await modRes.json();
            if (modData.status === 'approved') {
                setStatus('approved');
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
            } else {
                setStatus('rejected');
                setError(modData.reasons?.join(', ') || 'Video rejected by moderation');
            }
        } catch (e) {
            console.error('Upload error:', e);
            setError(e?.message || 'Upload failed');
            setStatus('idle');
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            minHeight: '70vh',
            display: 'grid',
            placeItems: 'center',
            padding: 24
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                textAlign: 'center',
                maxWidth: 520,
                width: '100%'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    children: "Submit your video"
                }, void 0, false, {
                    fileName: "[project]/src/app/post/create/step3/page.tsx",
                    lineNumber: 148,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        color: 'var(--muted)',
                        marginTop: 6
                    },
                    children: "Upload a video (max 30 seconds). AI will verify it meets our standards."
                }, void 0, false, {
                    fileName: "[project]/src/app/post/create/step3/page.tsx",
                    lineNumber: 149,
                    columnNumber: 9
                }, this),
                duration !== null && duration <= 30 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        marginTop: 8,
                        color: 'var(--primary)'
                    },
                    children: [
                        "Duration: ",
                        duration.toFixed(1),
                        "s ✓"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/post/create/step3/page.tsx",
                    lineNumber: 152,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "file",
                    accept: "video/*",
                    onChange: handleFile,
                    disabled: status === 'uploading' || status === 'moderating',
                    style: {
                        marginTop: 16,
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: 10,
                        border: '1px solid var(--border)',
                        background: '#ffffff',
                        color: 'var(--foreground)'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/post/create/step3/page.tsx",
                    lineNumber: 155,
                    columnNumber: 9
                }, this),
                file && duration && duration <= 30 && status === 'idle' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: uploadAndModerate,
                    style: {
                        marginTop: 12,
                        background: 'var(--primary)',
                        color: '#000',
                        padding: '12px 18px',
                        borderRadius: 10,
                        fontWeight: 700,
                        width: '100%'
                    },
                    children: "Upload and verify"
                }, void 0, false, {
                    fileName: "[project]/src/app/post/create/step3/page.tsx",
                    lineNumber: 164,
                    columnNumber: 11
                }, this),
                status === 'uploading' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        marginTop: 12
                    },
                    children: "Uploading..."
                }, void 0, false, {
                    fileName: "[project]/src/app/post/create/step3/page.tsx",
                    lineNumber: 172,
                    columnNumber: 36
                }, this),
                status === 'moderating' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        marginTop: 12
                    },
                    children: "AI is checking your video..."
                }, void 0, false, {
                    fileName: "[project]/src/app/post/create/step3/page.tsx",
                    lineNumber: 173,
                    columnNumber: 37
                }, this),
                status === 'approved' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: 12
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                color: 'var(--primary)',
                                fontWeight: 700,
                                textAlign: 'center'
                            },
                            children: "✓ Approved! Now create quiz questions."
                        }, void 0, false, {
                            fileName: "[project]/src/app/post/create/step3/page.tsx",
                            lineNumber: 176,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginTop: 24,
                                padding: 20,
                                background: 'var(--card)',
                                border: '1px solid var(--border)',
                                borderRadius: 12
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        marginBottom: 8
                                    },
                                    children: "Question 1"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/post/create/step3/page.tsx",
                                    lineNumber: 179,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: q1,
                                    onChange: (e)=>setQ1(e.target.value),
                                    placeholder: "Enter your first question...",
                                    style: {
                                        width: '100%',
                                        padding: '12px 16px',
                                        border: '1px solid var(--border)',
                                        borderRadius: 8,
                                        fontSize: '14px'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/post/create/step3/page.tsx",
                                    lineNumber: 180,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginTop: 12
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                fontSize: '13px',
                                                color: 'var(--muted)',
                                                marginBottom: 6,
                                                display: 'block'
                                            },
                                            children: "Question Type"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/post/create/step3/page.tsx",
                                            lineNumber: 183,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: q1Type,
                                            onChange: (e)=>setQ1Type(e.target.value),
                                            style: {
                                                padding: '10px 12px',
                                                borderRadius: 8,
                                                border: '1px solid var(--border)',
                                                width: '100%'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "tf",
                                                    children: "True / False"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/post/create/step3/page.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "mc",
                                                    children: "Multiple Choice"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/post/create/step3/page.tsx",
                                                    lineNumber: 186,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/post/create/step3/page.tsx",
                                            lineNumber: 184,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/post/create/step3/page.tsx",
                                    lineNumber: 182,
                                    columnNumber: 15
                                }, this),
                                q1Type === 'mc' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginTop: 12
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                fontSize: '13px',
                                                color: 'var(--muted)',
                                                marginBottom: 6,
                                                display: 'block'
                                            },
                                            children: "Answer Options (separate with commas)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/post/create/step3/page.tsx",
                                            lineNumber: 192,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: q1Options,
                                            onChange: (e)=>setQ1Options(e.target.value),
                                            placeholder: "Option 1, Option 2, Option 3, Option 4",
                                            style: {
                                                width: '100%',
                                                padding: '10px 12px',
                                                border: '1px solid var(--border)',
                                                borderRadius: 8,
                                                fontSize: '14px'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/post/create/step3/page.tsx",
                                            lineNumber: 193,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                fontSize: '13px',
                                                color: 'var(--muted)',
                                                marginTop: 8,
                                                display: 'block'
                                            },
                                            children: "Which option is correct? (0 for first, 1 for second, etc.)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/post/create/step3/page.tsx",
                                            lineNumber: 194,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            min: 0,
                                            max: 3,
                                            value: q1Correct,
                                            onChange: (e)=>setQ1Correct(parseInt(e.target.value) || 0),
                                            style: {
                                                width: '100%',
                                                padding: '10px 12px',
                                                border: '1px solid var(--border)',
                                                borderRadius: 8
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/post/create/step3/page.tsx",
                                            lineNumber: 195,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/post/create/step3/page.tsx",
                                    lineNumber: 191,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/post/create/step3/page.tsx",
                            lineNumber: 178,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginTop: 16,
                                padding: 20,
                                background: 'var(--card)',
                                border: '1px solid var(--border)',
                                borderRadius: 12
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        marginBottom: 8
                                    },
                                    children: "Question 2"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/post/create/step3/page.tsx",
                                    lineNumber: 201,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: q2,
                                    onChange: (e)=>setQ2(e.target.value),
                                    placeholder: "Enter your second question...",
                                    style: {
                                        width: '100%',
                                        padding: '12px 16px',
                                        border: '1px solid var(--border)',
                                        borderRadius: 8,
                                        fontSize: '14px'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/post/create/step3/page.tsx",
                                    lineNumber: 202,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginTop: 12
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                fontSize: '13px',
                                                color: 'var(--muted)',
                                                marginBottom: 6,
                                                display: 'block'
                                            },
                                            children: "Question Type"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/post/create/step3/page.tsx",
                                            lineNumber: 205,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: q2Type,
                                            onChange: (e)=>setQ2Type(e.target.value),
                                            style: {
                                                padding: '10px 12px',
                                                borderRadius: 8,
                                                border: '1px solid var(--border)',
                                                width: '100%'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "tf",
                                                    children: "True / False"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/post/create/step3/page.tsx",
                                                    lineNumber: 207,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "mc",
                                                    children: "Multiple Choice"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/post/create/step3/page.tsx",
                                                    lineNumber: 208,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/post/create/step3/page.tsx",
                                            lineNumber: 206,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/post/create/step3/page.tsx",
                                    lineNumber: 204,
                                    columnNumber: 15
                                }, this),
                                q2Type === 'mc' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginTop: 12
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                fontSize: '13px',
                                                color: 'var(--muted)',
                                                marginBottom: 6,
                                                display: 'block'
                                            },
                                            children: "Answer Options (separate with commas)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/post/create/step3/page.tsx",
                                            lineNumber: 214,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: q2Options,
                                            onChange: (e)=>setQ2Options(e.target.value),
                                            placeholder: "Option 1, Option 2, Option 3, Option 4",
                                            style: {
                                                width: '100%',
                                                padding: '10px 12px',
                                                border: '1px solid var(--border)',
                                                borderRadius: 8,
                                                fontSize: '14px'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/post/create/step3/page.tsx",
                                            lineNumber: 215,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                fontSize: '13px',
                                                color: 'var(--muted)',
                                                marginTop: 8,
                                                display: 'block'
                                            },
                                            children: "Which option is correct? (0 for first, 1 for second, etc.)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/post/create/step3/page.tsx",
                                            lineNumber: 216,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            min: 0,
                                            max: 3,
                                            value: q2Correct,
                                            onChange: (e)=>setQ2Correct(parseInt(e.target.value) || 0),
                                            style: {
                                                width: '100%',
                                                padding: '10px 12px',
                                                border: '1px solid var(--border)',
                                                borderRadius: 8
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/post/create/step3/page.tsx",
                                            lineNumber: 217,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/post/create/step3/page.tsx",
                                    lineNumber: 213,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/post/create/step3/page.tsx",
                            lineNumber: 200,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                // Save quiz to localStorage before navigating
                                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                                ;
                                router.push('/post/create/payment');
                            },
                            disabled: !q1.trim() || !q2.trim(),
                            style: {
                                marginTop: 24,
                                background: !q1.trim() || !q2.trim() ? '#ccc' : 'var(--primary)',
                                color: '#000',
                                padding: '14px 20px',
                                borderRadius: 10,
                                fontWeight: 700,
                                width: '100%',
                                cursor: !q1.trim() || !q2.trim() ? 'not-allowed' : 'pointer'
                            },
                            children: "Continue to payment"
                        }, void 0, false, {
                            fileName: "[project]/src/app/post/create/step3/page.tsx",
                            lineNumber: 222,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/post/create/step3/page.tsx",
                    lineNumber: 175,
                    columnNumber: 11
                }, this),
                status === 'rejected' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        marginTop: 12,
                        color: '#ff4444'
                    },
                    children: [
                        "Rejected: ",
                        error
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/post/create/step3/page.tsx",
                    lineNumber: 265,
                    columnNumber: 11
                }, this),
                error && status === 'idle' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        marginTop: 8,
                        color: '#ff4444'
                    },
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/app/post/create/step3/page.tsx",
                    lineNumber: 267,
                    columnNumber: 40
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/post/create/step3/page.tsx",
            lineNumber: 147,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/post/create/step3/page.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_app_post_create_step3_page_tsx_3a6dce18._.js.map