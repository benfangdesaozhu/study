const NODE_ENV = process.env.NODE_ENV
const config = {
    production: {
        test: '222'
    },
    development: {
        test: '111'
    }
}
module.exports = config[NODE_ENV]