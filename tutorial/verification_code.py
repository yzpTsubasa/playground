from PIL import Image, ImageDraw, ImageFont, ImageFilter

import random

def randChar():
    return chr(random.randint(65, 90))

def randColor():
    return (random.randint(64, 255), random.randint(64, 255), random.randint(64, 255))

def randColor2():
    return (random.randint(32, 127), random.randint(32, 127), random.randint(32, 127))

width = 60 * 4
height = 60

image = Image.new('RGB', (width, height), (255, 255, 255))

font = ImageFont.truetype("msyh.ttc", 36)
# 创建绘制对象
draw = ImageDraw.Draw(image)

for x in range(width):
    for y in range(height):
        draw.point((x, y), fill=randColor())
verification_code = ""
for t in range(4):
    char = randChar()
    verification_code += char
    draw.text((60 * t + 10, 10), char, font=font, fill=randColor2())
image = image.filter(ImageFilter.BLUR)
image.save('./out/out.jpg', 'jpeg')

print ("Verification Code is %s" % verification_code)