const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            console.log(localMediaStream);
            video.src = window.URL.createObjectURL(localMediaStream);
            video.play();
        })
        .catch(err => {
            console.error('Camera not found! ', err);
        })
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);

        let pixels = ctx.getImageData(0, 0, width, height);
        pixels = redEffect(pixels.data);
        ctx.context.putImageData(pixels, 0, 0);
    }, 16);
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.length; i += 4) {
        pixels[i + 0] = pixels[i + 0] + 100; //r
        pixels[i + 1] = pixels[i + 1] - 50; //g
        pixels[i + 2] = pixels[i + 2] * 0.5; //b
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.length; i += 4) {
        pixels[i - 150] = pixels[i + 0] //r
        pixels[i + 100] = pixels[i + 1] //g
        pixels[i - 150] = pixels[i + 2] //b
    }
    return pixels;
}

function takePhoto() {
    // play sound
    snap.currentTime = 0;
    snap.play();

    // take data from canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHtml = `<img src="${data}" alt="handsome" />`;
    strip.insertBefore(link, strip.firstChild);
}

getVideo();
video.addEventListener('canplay', paintToCanvas);