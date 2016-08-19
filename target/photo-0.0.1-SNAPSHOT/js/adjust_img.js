//圖片按比例縮放
function AdjustImageW(ImgD,iwidth,iheight){
    var image=new Image();
    //var iwidth = 160; //定義允許圖片寬度，當寬度大於這個值時等比例縮小
    //var iheight = 120; //定義允許圖片高度，當寬度大於這個值時等比例縮小
    image.src = ImgD.src;
    if(image.width>0 && image.height>0){
        if(image.width/image.height>= iwidth/iheight){
            if(image.width>iwidth){
                ImgD.width = iwidth;
                ImgD.height = (image.height * iwidth)/image.width;
            }else{
                ImgD.width = image.width;
                ImgD.height = image.height;
            }
            ImgD.alt=image.width+"×"+image.height;
        }else{
            if(image.height > iheight){
                ImgD.height = iheight;
                ImgD.width = (image.width * iheight) / image.height;
            }else{
                ImgD.width = image.width;
                ImgD.height = image.height;
            }
            ImgD.alt = image.width + "×" + image.height;
        }
    }
}
function AdjustImageH(ImgD,iwidth,iheight){
    var image=new Image();
    //var iwidth = 160; //定義允許圖片寬度，當寬度大於這個值時等比例縮小
    //var iheight = 120; //定義允許圖片高度，當寬度大於這個值時等比例縮小
    image.src = ImgD.src;
    if(image.width>0 && image.height>0){
        if(image.width/image.height>= iwidth/iheight){
            if(image.height > iheight){
                ImgD.height = iheight;
                ImgD.width = (image.width * iheight) / image.height;
            }else{
                ImgD.width = image.width;
                ImgD.height = image.height;
            }
            ImgD.alt = image.width + "×" + image.height;
        }else{
            if(image.width>iwidth){
                ImgD.width = iwidth;
                ImgD.height = (image.height * iwidth)/image.width;
            }else{
                ImgD.width = image.width;
                ImgD.height = image.height;
            }
            ImgD.alt=image.width+"×"+image.height;
        }
    }
}
//調用：<img src="圖片" onload="javascript:DrawImage(this)">
