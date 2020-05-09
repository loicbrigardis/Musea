const cursor = document.querySelector('.cursor');
const editCursor = e => {
    const { clientX: x, clientY: y } = e;
    cursor.style.left = (x - 40) + 'px';
    cursor.style.top = (y - 20) + 'px';
};

document.addEventListener('mousemove', editCursor);