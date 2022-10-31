/**
 * https://stackoverflow.com/a/38552302/5500609
 */
export const parseJwt = token => JSON.parse(
    decodeURIComponent(
        window.atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    )
);