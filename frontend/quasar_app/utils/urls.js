import urlJoin from 'url-join';

export function staticUrl(path) {
    return urlJoin(process.env.API_URL, 'static', path)
}