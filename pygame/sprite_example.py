# Pygame template - skeleton for a new pygame project
import pygame
import random
import os

WIDTH = 360
HEIGHT = 480
FPS = 30

# 颜色
WHITE = (0xff, 0xff, 0xff)
BLACK = (0, 0, 0)
RED = (0xff, 0, 0)
GREEN = (0, 0xff, 0)
BLUE = (0, 0, 0xff)
CUSTOM_GREEN = (0, 0xb0, 0x50)
CUSTOM_GRAY = (0x55, 0x55, 0x55)

# 资源管理
game_folder = os.path.dirname(__file__)
assets_folder = os.path.join(game_folder, "assets")
img_folder = os.path.join(assets_folder, "img")

class Player(pygame.sprite.Sprite):
    
    def __init__(self):
        super(Player, self).__init__()
        # 显示内容
        # self.image = pygame.Surface((50, 50))
        # self.image.fill(GREEN)
        self.image = pygame.image.load(os.path.join(img_folder, "p1_jump.png")).convert()
        self.image.set_colorkey(BLACK) # 过滤黑色
        # 位置及大小
        self.rect = self.image.get_rect()
        # 居中显示
        self.rect.center = (WIDTH / 2, HEIGHT / 2)

        self.speed_y = 0.1
        self.speed_x = 0.2

    def update(self, timeInMs = 35):
        self.rect.x += timeInMs * self.speed_x
        self.rect.y += timeInMs * self.speed_y
        if self.rect.right >= WIDTH and self.speed_x > 0 or self.rect.left <= 0 and self.speed_x < 0:
            self.speed_x *= -1

        if self.rect.bottom >= HEIGHT and self.speed_y > 0 or self.rect.top <= 0 and self.speed_y < 0:
            self.speed_y *= -1
# 游戏核心初始化
pygame.init()
# 游戏声音初始化
pygame.mixer.init()
# 显示
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Tsubasa Game")
# 定时器
clock = pygame.time.Clock()

# 创建一个精灵组，所有的精灵都会在组中管理
all_sprites = pygame.sprite.Group()
player = Player()
all_sprites.add(player)

# 游戏循环
running = True
while running:
    # 处理输入事件
    for event in pygame.event.get():
        # 关闭窗口
        if event.type == pygame.QUIT:
            running = False
    # 更新
    all_sprites.update()
    # 绘制/渲染
    screen.fill(CUSTOM_GRAY)
    all_sprites.draw(screen)
    # 绘制结束后，刷新显示
    pygame.display.flip()
    
    # 处理FPS
    clock.tick(FPS)