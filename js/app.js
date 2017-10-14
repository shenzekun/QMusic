(function () {
    var silder = new Silder({
        el:document.querySelector("#slider"),
        slides:[
            {link: '#1',image: './images/dream.jpg'},
            {link: '#2', image:'./images/newsinging.jpg'},
            {link: '#3', image:'./images/tianhou.jpg'},
            {link: '#4', image:'./images/wanglihong.jpg'},
            {link: '#5', image:'./images/zhangyixing.jpg'}
        ]
    });
    window.silder = silder;
})();
