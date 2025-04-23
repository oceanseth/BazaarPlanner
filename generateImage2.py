import numpy as np
from PIL import Image, ImageDraw

# Constants
width, height = 80, 160
num_particles = 300
num_frames = 48
particle_lifespan = num_frames
particle_size_max = 20
particle_size_min = 2

# Particle class
class Particle:
    def __init__(self):
        self.reset()

    def reset(self):
        self.x = np.random.uniform(-20, 0)  # start off-canvas from bottom-left
        self.y = np.random.uniform(height, height + 20)
        self.vx = np.random.uniform(1.0, 2.0)
        self.vy = np.random.uniform(-2.0, -1.0)
        self.alpha = np.random.uniform(0.4, 0.8)  # Initial opacity
        self.phase = np.random.uniform(0, 2 * np.pi)
        self.size = np.random.uniform(particle_size_min, particle_size_max)
        self.age = 0
        self.fade_direction = -1  # -1 for fading out, 1 for fading in
        self.fade_speed = np.random.uniform(0.01, 0.02)  # Speed of opacity change

    def update(self, t):
        # Update opacity
        self.alpha += self.fade_direction * self.fade_speed
        if self.alpha <= 0:
            self.fade_direction = 1  # Start fading in
        elif self.alpha >= 0.8:
            self.fade_direction = -1  # Start fading out

        # Create a circular motion pattern
        angle = 2 * np.pi * t / num_frames
        center_x = width / 2
        center_y = height / 2
        radius = 30
        target_x = center_x + radius * np.cos(angle)
        target_y = center_y + radius * np.sin(angle)

        # Move towards the target position
        dx = target_x - self.x
        dy = target_y - self.y
        self.vx = dx * 0.1
        self.vy = dy * 0.1

        # Update position
        self.x += self.vx
        self.y += self.vy
        self.age += 1

        # Reset position if particle goes off screen
        if self.x < -20 or self.x > width + 20 or self.y < -20 or self.y > height + 20:
            self.reset()

    def draw(self, draw_obj, frame_index):
        # Ensure alpha is between 0 and 1
        current_alpha = max(0, min(1, self.alpha))
        final_alpha = int(255 * current_alpha)
        color = (255, 215, 100, final_alpha)  # warm golden shimmer
        bbox = [
            self.x - self.size / 2,
            self.y - self.size / 2,
            self.x + self.size / 2,
            self.y + self.size / 2
        ]
        draw_obj.ellipse(bbox, fill=color)


# Main function
def generate_particle_animation(filename="Golden.webp"):
    particles = []  # Start with empty list
    particles_per_frame = num_particles // num_frames  # How many to add each frame
    frames = []

    for frame_index in range(num_frames):
        # Add new particles each frame until we reach num_particles
        while len(particles) < min((frame_index + 1) * particles_per_frame, num_particles):
            particles.append(Particle())

        frame = Image.new("RGBA", (width, height), (0, 0, 0, 0))
        draw = ImageDraw.Draw(frame)

        for p in particles:
            p.update(frame_index)
            p.draw(draw, frame_index)

        frames.append(frame)

    # Save to animated WebP
    frames[0].save(
        filename,
        save_all=True,
        append_images=frames[1:],
        duration=100,
        loop=0,
        lossless=True,
        transparency=0
    )
    print(f"Saved animation as {filename}")


if __name__ == "__main__":
    generate_particle_animation("Golden.webp")
