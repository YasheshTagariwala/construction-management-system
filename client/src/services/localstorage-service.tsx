export const setSessionCookie = (session: any) => {
    localStorage.setItem('construction', session);
}

export const getSessionCookie = () => {
    let sessionCookie: any = localStorage.getItem('construction');

    if (!sessionCookie) {
        return null
    }
    return sessionCookie;
}