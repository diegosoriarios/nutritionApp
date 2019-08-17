tirarFoto = () => {

    $('.webcam-container').css('display', 'inline-block');
    $('.wrapper').css('display', 'none');

    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            video.srcObject = stream;
            video.play();
        });
    }
}

voltar = () => {
    $('.webcam-container').css('display', 'none');
    $('.wrapper').css('display', 'inline-block');
}

salvar = () => {
    takeASnap().then(download)
}

takeASnap = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0,0);
    return new Promise((res, rej)=>{
      canvas.toBlob(res, 'image/jpeg');
    });
}

download = blob => {
    let a = document.createElement('a'); 
    a.href = URL.createObjectURL(blob);
    a.download = 'screenshot.jpg';
    document.body.appendChild(a);
    a.click();
    voltar()
}