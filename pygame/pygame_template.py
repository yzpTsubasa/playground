# Pygame template - skeleton for a new pygame project
import pygame
import random

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

# 游戏循环
running = True
while running:
    # 处理FPS
    clock.tick(FPS)
    # 处理输入事件
    for event in pygame.event.get():
        # 关闭窗口
        if event.type == pygame.QUIT:
            running = False
    # 更新
    all_sprites.update()
    # 绘制/渲染
    screen.fill(BLACK)
    all_sprites.draw(screen)
    # 绘制结束后，刷新显示
    pygame.display.flip()