/**
 * Acessa a webcam
 */
tirarFoto = () => {

    $('.webcam-container').css('display', 'inline-block');
    $('.wrapper').css('display', 'none');

    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
            video.srcObject = stream;
            video.play();
            })
            .catch(err => {
                console.log(err)
            })
    }
}

/**
 * Botão de voltar, desliga a webcam
 * Remove o acesso a webcam
 */
voltar = () => {
    $('.webcam-container').css('display', 'none');
    $('.wrapper').css('display', 'inline-block');
    
    let stream = video.srcObject;
    let tracks = stream.getTracks();
    
    for (let i = 0; i < tracks.length; i++) {
        let track = tracks[i];
        track.stop();
    }
    
    video.srcObject = null;
}

/**
 * Tira a foto
 */
salvar = () => {
    takeASnap().then(download)
}

/**
 * Salva a imagem
 */
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

/**
 * Usa a imagem para calcular calorias
 * Opção comentada é o download da foto
 */
download = blob => {
    let base64data
    let file = new FileReader()
    file.readAsDataURL(blob)
    file.onloadend = () => {
        base64data = file.result
        useWebcamPicture(file, base64data)
    }
    voltar()
    
    /*
    let a = document.createElement('a'); 
    a.href = URL.createObjectURL(blob);
    a.download = 'screenshot.jpg';
    document.body.appendChild(a);
    a.click();
    voltar()
    */
}