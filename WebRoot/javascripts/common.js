function getAjaxRandom(){
    var vNum;
    vNum = Math.random();
    vNum = Math.round(vNum*1000000);
    return vNum;
}

function msg(m) {
    BootstrapDialog.alert(m);
}