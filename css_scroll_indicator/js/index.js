var app = new Vue({
    el: '#app',
    data: {
        datas: [
            
        ],
    }
});

for (var i = 0, len = 50; i < len; ++i) {
    var data = {color: `rgba(${255 * Math.random()}, ${255 * Math.random()}, ${255 * Math.random()})`, content: `I'm NO. ${i + 1}`};
    app.datas.push(data);
}