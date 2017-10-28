export function lazyload() {
  let imgs = Array.from(document.querySelectorAll(".lazyload"));
  //判断浏览器是否有IntersectionObserver
  if ("IntersectionObserver" in window) {
    let observer = new IntersectionObserver(function(changes) {
      changes.forEach(change => {
        if (change.intersectionRatio > 0) {
          loadImage(change.target, () => {
            observer.unobserve(change.target);
          });
        }
      });
    });
    imgs.forEach(img => {
      observer.observe(img);
    });
  } else {
    let onscroll = throttle(function() {
      console.log(imgs.length);
      imgs = imgs.filter(img => img.classList.contains("lazyload"));
      imgs.forEach(img => isVisible(img) && loadImage(img));
      //如果图片到没有了，移除监听事件提高性能
      if (imgs.length === 0) {
        window.removeEventListener("scroll", onscroll);
      }
      imgs.forEach(img => isVisible(img) && loadImage(img));
    }, 300);
    window.addEventListener("scroll", onscroll);
    window.dispatchEvent(new Event("scroll"));
  }
}

//节流
function throttle(func, wait) {
  let context, args, timer;
  let prev = 0;
  return function fn() {
    let now = +new Date();
    let diff = now - prev;
    context = this;
    args = arguments;
    if (!prev || diff >= wait) {
      func.apply(context, args);
      prev = now;
    } else if (diff < wait) {
      clearTimeout(timer);
      timer = setTimeout(fn, wait - diff);
    }
  };
}
//判断是否可见
function isVisible(img) {
  let { top, left, right, bottom } = img.getBoundingClientRect();
  let windowWidth = document.documentElement.clientWidth;
  let windowHeight = document.documentElement.clientHeight;
  return (
    ((top > 0 && top < windowHeight) ||
      (bottom > 0 && bottom < windowHeight)) &&
    ((left > 0 && left < windowWidth) || (right > 0 && right < windowWidth))
  );
}

//加载图片
function loadImage(img, callback) {
  let image = new Image();
  image.src = img.dataset.src;
  image.onload = () => {
    img.src = image.src;
    img.classList.remove("lazyload");
    if (Object.prototype.toString.call(callback) === "[object Function]")
      callback();
  };
}
