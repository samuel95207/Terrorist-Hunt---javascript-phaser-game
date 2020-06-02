import cv2
import os

 
for file in os.listdir("./"):
    file = "./" + file 
    print(file)
    # if(file != "./isometric_pixel_0213.png"):
        # continue
    img = cv2.imread(file, cv2.IMREAD_UNCHANGED)
    # # cv2.imshow("img",img)
    dim = (40, 40)
    resized = cv2.resize(img, dim, interpolation = cv2.INTER_AREA)
    crop_img = resized[:,:]
    # # cv2.imshow("cropped", crop_img)
    # # cv2.waitKey(0)
    # # break
    rows,cols,channels=crop_img.shape
    dst=crop_img.copy()
    a=1.5
    b=150
    for i in range(rows):
        for j in range(cols):
            for c in range(3):
                color=crop_img[i,j][c]*a+b
                if color>255:           # 防止像素值越界（0~255）
                    dst[i,j][c]=255
                elif color<0:           # 防止像素值越界（0~255）
                    dst[i,j][c]=0
    # cv2.imshow('dst',dst)
    # cv2.waitKey(0)
                    
    # break
    cv2.imwrite(file, dst)
