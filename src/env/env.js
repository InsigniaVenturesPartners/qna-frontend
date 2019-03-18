// Quick dirty env

let stage = process.env.NODE_ENV

let environment
switch (stage) {
    case 'production':
        environment = {
            GOOGLE_ANALYTICS_TRACKING_ID: '',
            GOOGLE_CLIENT_ID: '1088352541792-g3gme4e9ol8akmus0qj5do2nb9fql373.apps.googleusercontent.com',
            AWS_REGION: 'ap-southeast-1',
            API_ROOT_URL: 'http://qna.api.insignia.vc',
            WEB_ROOT_URL: ' '
        }
        break
    case 'test':
    case 'development':
    default:
        environment = {
            GOOGLE_ANALYTICS_TRACKING_ID: '',
            GOOGLE_CLIENT_ID: '1088352541792-g3gme4e9ol8akmus0qj5do2nb9fql373.apps.googleusercontent.com',
            AWS_REGION: 'ap-southeast-1',
            API_ROOT_URL: 'http://localhost:2000',
            WEB_ROOT_URL: 'http://localhost:3000/'
        }
        break
}

export const ENV = environment
