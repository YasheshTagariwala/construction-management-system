export const setSessionCookie = (session) => {
    localStorage.setItem('construction', JSON.stringify(session));
}

export const getSessionCookie = () => {
    let sessionCookie = localStorage.getItem('construction');

    if (!sessionCookie) {
        return null
    }
    return JSON.parse(sessionCookie);
}
