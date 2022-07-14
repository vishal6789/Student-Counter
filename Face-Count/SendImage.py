# import requests
# import pickle
# import numpy as np
# import json

# myurl = 'https://localhost:3001/processimage'
# url = "http://localhost:3001/input"

# files = {'image': open('img1.jpg', 'rb')}


# image_file = 'img1.jpg'

# with open(image_file, "rb") as f:
#     im_bytes = f.read()        
# im_b64 = base64.b64encode(im_bytes).decode("utf8")

# headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
  
# payload = json.dumps({"image": im_b64, "other_key": "value"})


# test_res = requests.post(myurl,files = files)
# if test_res.ok:
#     print(" File uploaded successfully ! ")
#     print(test_res.text)
    
# else:
#     print(" Please Upload again ! ")

# # from os.path import exists

# # file_exists = exists('input/img1.jpg')
# # print(file_exists)



import requests
import cv2

cam = cv2.VideoCapture(0)

result , image  = cam.read()
cv2.imwrite("classA.jpg",image)
dfile = open("classA.jpg", "rb")
url = "http://localhost:3001/processimage"
test_res = requests.post(url, files = {"classimage": dfile})
if test_res.ok:
    print(" File uploaded successfully ! ")
    print(test_res.text)
else:
    print(" Please Upload again ! ")