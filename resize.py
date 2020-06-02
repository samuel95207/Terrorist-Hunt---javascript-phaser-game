import cv2
import os

 
for file in os.listdir("./"):
    file = "./" + file 
    print(file)
    img = cv2.imread(file, cv2.IMREAD_UNCHANGED)
    # cv2.imshow("img",img)
    dim = (40, 40)
    resized = cv2.resize(img, dim, interpolation = cv2.INTER_AREA)
    cv2.imwrite(file, resized)
