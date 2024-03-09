import { toast } from 'sonner'
import { useState, useEffect } from 'react'
import { JwtPayload, jwtDecode } from 'jwt-decode'

import { createViewerToken } from '@/actions/token'

export const useViewerToken = (hostIdentity: string) => {
    const [token, setToken] = useState<string>('')

    const [name, setName] = useState<string>('')

    const [identity, setIdentity] = useState<string>('')

    useEffect(() => {
        const createToken = async () => {
            try {
                const viewerToken = await createViewerToken(hostIdentity)

                setToken(viewerToken)

                const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
                    name?: string,
                }

                const name = decodedToken?.name

                if (name) {
                    setName(name)
                }

                const identity = decodedToken.jti

                if (identity) {
                    setIdentity(identity)
                }
            } catch (error) {
                toast.error('Something went wrong.')
            }
        }

        createToken()
    }, [hostIdentity])

    return {
        token,
        name,
        identity,
    }
}