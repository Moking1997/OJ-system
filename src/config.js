let server = ""

if (process.env.NODE_ENV == 'development') {
    server = 'http://localhost:8088'
} else {
    server = 'http://www.aaa.com'
}
export const Server = server