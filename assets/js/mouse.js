const link = document.querySelectorAll('.hover-this');
const cursor = document.querySelector('.cursor');

const animateit = function (e) {
    const span = this.querySelector('span');
    const { offsetX: x, offsetY: y } = e,
    { offsetWidth: width, offsetHeight: height } = this,

    move = 25,
    xMove = x / width * (move * 2) - move,
    yMove = y / height * (move * 2) - move;

    
    cursor.style.transform = "Scale(4)";
    if (span) span.style.transform = `translate(${xMove}px, ${yMove}px) Scale(1.3)`;

    if (span && e.type === 'mouseleave') span.style.transform = '';
    if (cursor && e.type === 'mouseleave') cursor.style.transform = "";
};

const editCursor = e => {
    const { clientX: x, clientY: y } = e;
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';

    
};

link.forEach(b => b.addEventListener('mousemove', animateit));
link.forEach(b => b.addEventListener('mouseleave', animateit));
document.addEventListener('mousemove', editCursor);