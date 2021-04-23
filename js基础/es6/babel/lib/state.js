var a = {state: 1}
var b = 1
setTimeout(() => {
    b = 2
}, 500)
export default {
    a,
    b
}