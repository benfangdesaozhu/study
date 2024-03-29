const path = require('path');
class vconsolePlugin {
    constructor(options) {
        this.options = Object.assign({
            enable: false
        }, options)
    }
    apply(compiler) {
        const vConsolePath = path.join('./src/vconsole.js')
        compiler.hooks.entryOption.tap('vconsolePlugin', (compilation, entry) => {
            console.log(vConsolePath, entry, this.options)
            if(this.options.enable){
                entry.main.import.push(`./${vConsolePath}`)
            }
        }) 
    }
}
module.exports = vconsolePlugin