# Pygame template - skeleton for a new pygame project
import pygame
import random
from enum import Enum, IntEnum

WIDTH = 480
HEIGHT = 600
FPS = 60

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
pygame.display.set_caption("Shmup!")
# 定时器
clock = pygame.time.Clock()


class CtrlValue(IntEnum):
    LEFT = 1
    RIGHT = 2
    UP = 3
    DOWN = 4

class Player(pygame.sprite.Sprite):

    def __init__(self):
        super(Player, self).__init__()
        self.image = pygame.Surface((50, 40))
        self.image.fill(GREEN)
        self.rect = self.image.get_rect()
        self.rect.centerx = WIDTH / 2
        self.rect.bottom = HEIGHT - 10
        self.speed_x = 0
        self.speed_value = 0.1
        self.ctrlValue = 0

    def update(self, delta_time = 35):
        keystate = pygame.key.get_pressed()
        if keystate[pygame.K_LEFT] or keystate[pygame.K_a]:
            self.moveLeft(False)
        else:
            self.stopMoveLeft(False)

        if keystate[pygame.K_RIGHT] or keystate[pygame.K_d]:
            self.moveRight(False)
        else:
            self.stopMoveRight(False)
        self.checkCtrlValue()
        
        self.rect.x += self.speed_x * delta_time

        if self.rect.right > WIDTH:
            self.rect.right = WIDTH
        elif self.rect.left < 0:
            self.rect.left = 0

    def checkCtrlValue(self):
        leftBit = self.ctrlValue & CtrlValue.LEFT
        rightBit = self.ctrlValue & CtrlValue.RIGHT
        if leftBit and rightBit or not leftBit and not rightBit:
            self.speed_x = 0
        elif leftBit:
            self.speed_x = self.speed_value * -1
        elif rightBit:
            self.speed_x = self.speed_value
        
    def moveLeft(self, check = True):
        self.ctrlValue |= CtrlValue.LEFT
        if check:
            self.checkCtrlValue()

    def moveRight(self, check = True):
        self.ctrlValue |= CtrlValue.RIGHT
        if check:
            self.checkCtrlValue()

    def stopMoveLeft(self, check = True):
        self.ctrlValue &= (~CtrlValue.LEFT)
        if check:
            self.checkCtrlValue()
    
    def stopMoveRight(self, check = True):
        self.ctrlValue &= (~CtrlValue.RIGHT)
        if check:
            self.checkCtrlValue()

# 创建一个精灵组，所有的精灵都会在组中管理
all_sprites = pygame.sprite.Group()
player = Player()
all_sprites.add(player)

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
        # elif event.type == pygame.KEYDOWN:
        #     if event.key == pygame.K_a or event.key == pygame.K_LEFT:
        #         player.moveLeft()
        #     elif event.key == pygame.K_d or event.key == pygame.K_RIGHT:
        #         player.moveRight()
        # elif event.type == pygame.KEYUP:
        #     if event.key == pygame.K_a or event.key == pygame.K_LEFT:
        #         player.stopMoveLeft()
        #     elif event.key == pygame.K_d or event.key == pygame.K_RIGHT:
        #         player.stopMoveRight()
    # 更新
    all_sprites.update()
    # 绘制/渲染
    screen.fill(BLACK)
    all_sprites.draw(screen)
    # 绘制结束后，刷新显示
    pygame.display.flip()