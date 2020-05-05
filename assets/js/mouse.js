const wrapper = document.querySelector('.wrapper');
const link = document.querySelectorAll('.hover-this');
const cursor = document.querySelector('.cursor');

const animateit = function (e, ev) {
    const span = ev.querySelector('span');
    const { offsetX: x, offsetY: y } = e,
    { offsetWidth: width, offsetHeight: height } = ev,

    move = 25,
    xMove = x / width * (move * 2) - move,
    yMove = y / height * (move * 2) - move;

    
    if(e.type === "mousemove") {
        cursor.style.transform = "Scale(4)";
        if (span) span.style.transform = `translate(${xMove}px, ${yMove}px) Scale(1.3)`;
    } else {
        if (span) span.style.transform = '';
        if (cursor) cursor.style.transform = "";
    }

};

const editCursor = e => {
    const { clientX: x, clientY: y } = e;
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
};

wrapper.addEventListener('mousemove', (ev) => {
    if(ev.target.tagName === "A" && ev.target.classList.contains('hover-this')) {
        animateit(ev, ev.target);
    }
});
wrapper.addEventListener('mouseout', (ev) => {
    if(ev.target.tagName === "A" && ev.target.classList.contains('hover-this')) {
        animateit(ev, ev.target);
    }
});
document.addEventListener('mousemove', editCursor);