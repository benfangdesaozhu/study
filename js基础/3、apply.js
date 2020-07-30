
Function.prototype.myApply = function () {
    let target = [...arguments].shift()
    target = target ? Object(target) : window 
    const args = [...arguments].slice(1)
    target.fn=this
    const result = target.fn(...args)
    delete target.fn
    return result
}
function sayWord() {
    var talk = [this.name, 'say', this.word].join(' ');
    console.log(this.name, talk);
  }
  
  var bottle = {
    name: 'bottle', 
    word: 'hello'
  };
  
  // 使用 call 将 bottle 传递为 sayWord 的 this
  sayWord.apply(bottle); 
  sayWord.myApply(bottle); 