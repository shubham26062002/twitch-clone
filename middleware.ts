import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
    publicRoutes: [
        '/',
        '/:username',
        '/api/webhooks/clerk',
        '/api/webhooks/livekit',
        '/api/uploadthing',
        '/search',
    ],
})

export const config = {
    matcher: [
        '/((?!.+\\.[\\w]+$|_next).*)',
        '/',
        '/(api|trpc)(.*)',
    ],
};
