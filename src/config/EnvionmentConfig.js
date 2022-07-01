const local = {
    API_ENDPOINT_URL: process.env.REACT_APP_API_LOCAL_ENDPOINT_URL
};
const dev = {
    API_ENDPOINT_URL: process.env.REACT_APP_API_DEV_ENDPOINT_URL
};
const prod = {
    API_ENDPOINT_URL: process.env.REACT_APP_API_ENDPOINT_URL
};
const test = {
    API_ENDPOINT_URL: process.env.REACT_APP_API_TEST_ENDPOINT_URL
};

const getEnv = () => {
    // console.log(process.env.NODE_ENV)
    switch (process.env.NODE_ENV) {
        case "localhost":
            return local;
        case "development":
            return dev;
        case "production":
            return prod;
        case "test":
            return test;
        default:
            break;
    }
};

export const env = getEnv();