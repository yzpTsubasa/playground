from PIL import Image, ImageFilter, ImageDraw, ImageFont

img = Image.open('./assets/img/logo.jpg')

# 尺寸
w, h = img.size
size = img.size
print ("Original image size: %sx%s" % (w, h))
# 缩略图
img.thumbnail((w/2, h/2))
print ("Resize image to %sx%s" % (w/2, h/2))

# 滤镜处理
# 高斯模糊
img = img.filter(ImageFilter.GaussianBlur(5))
img.save('./out/logo_copy.jpg', 'jpeg')