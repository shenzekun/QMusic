export function lazyload(){
    let imgs = Array.from(document.querySelectorAll(".lazyload"));
    //判断浏览器是否有IntersectionObserver
    if ('IntersectionObserver' in window) {
        let observer = new IntersectionObserver(function(changes){
            changes.forEach(change=>{
                if (change.intersectionRatio > 0){
                    loadImage(change.target,()=>{
                        observer.unobserve(change.target);
                    });
                }
            })
        });
        imgs.forEach(img=>{
            observer.observe(img);
        })
    }else {
        
    }
}

//判断是否可见
function isVisible(img){
    let {top,left,right,bottom} = img.getBoundingClientRect();
    let windowWidth = document.documentElement.clientWidth;
    let windowHeight = document.documentElement.clientHeight;
    return (
        (top>0 && top<windowHeight || bottom > 0 && bottom <windowHeight) &&
        (left>0 && left <windowWidth || right> 0 && right <windowHeight)
    )
}

//加载图片
function loadImage(img,callback){
    let image = new Image();
    image.src = img.dataset.src;
    image.onload = () => {
        img.src = image.src;
        img.classList.remove('lazyload');
        if (Object.prototype.toString.call(callback) === '[object Function]') callback();
    }
}