export const setSessionCookie = (session: any) => {
    localStorage.setItem('construction', JSON.stringify(session));
}

export const getSessionCookie = () => {
    let sessionCookie: any = localStorage.getItem('construction');

    if (!sessionCookie) {
        return null
    }
    return JSON.parse(sessionCookie);
}