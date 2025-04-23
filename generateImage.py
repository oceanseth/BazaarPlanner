import numpy as np
from PIL import Image, ImageDraw

# === Config ===
WIDTH, HEIGHT = 80, 160
NUM_PARTICLES = 300
NUM_FRAMES = 24
PARTICLE_LIFESPAN = NUM_FRAMES
PARTICLE_SIZE = 2
OUTPUT_PATH = "Golden.webp"

# === Particle class ===
class Particle:
    def __init__(self):
        self.reset()

    def reset(self):
        self.x = np.random.uniform(-20, 0)  # start off-canvas to the left
        self.y = np.random.uniform(HEIGHT, HEIGHT + 20)  # start near bottom
        self.vx = np.random.uniform(1.0, 2.0)
        self.vy = np.random.uniform(-2.0, -1.0)
        self.alpha = np.random.uniform(0.4, 1.0)
        self.phase = np.random.uniform(0, 2 * np.pi)
        self.age = 0

    def update(self, t):
        # Simulate wind force (rightward) and swirl
        self.vx += 0.05  # horizontal wind
        self.vy -= 0.01  # slight upward pull

        dx = self.x - WIDTH / 2
        dy = self.y - HEIGHT / 2
        r = np.hypot(dx, dy)
        if r > 0:
            swirl_fx = -dy / r * 0.1
            swirl_fy = dx / r * 0.1
            self.vx += swirl_fx
            self.vy += swirl_fy

        # Update position
        self.x += self.vx
        self.y += self.vy
        self.age += 1

        # Reset if out of bounds or too old
        if self.age > PARTICLE_LIFESPAN or self.x > WIDTH or self.y < 0:
            self.reset()

    def draw(self, draw_obj, frame_index):
        shimmer = 0.6 + 0.4 * np.sin(2 * np.pi * frame_index / NUM_FRAMES + self.phase)
        alpha = int(255 * self.alpha * shimmer)
        color = (255, 215, 100, alpha)
        bbox = [self.x - PARTICLE_SIZE / 2, self.y - PARTICLE_SIZE / 2,
                self.x + PARTICLE_SIZE / 2, self.y + PARTICLE_SIZE / 2]
        draw_obj.ellipse(bbox, fill=color)

# === Generate animation ===
def generate_frames():
    particles = [Particle() for _ in range(NUM_PARTICLES)]
    frames = []

    for frame_index in range(NUM_FRAMES):
        frame = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
        draw = ImageDraw.Draw(frame)

        for p in particles:
            p.update(frame_index)
            p.draw(draw, frame_index)

        frames.append(frame)

    return frames

# === Save to animated WebP ===
def save_webp(frames, output_path):
    frames[0].save(
        output_path,
        save_all=True,
        append_images=frames[1:],
        duration=100,
        loop=0,
        lossless=True,
        transparency=0
    )

# === Run ===
if __name__ == "__main__":
    frames = generate_frames()
    save_webp(frames, OUTPUT_PATH)
    print(f"Saved animation to {OUTPUT_PATH}")
