import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { items } from '../items.js';
import { BazaarPatcher } from '../js/BazaarPatcher.js';
BazaarPatcher.apply();
const execAsync = promisify(exec);
function cleanName(name) {
    return name.replace(/[ '"()\-_\.&]/g, '');
}
async function generateEnchantOverlays() {
    const tempDir = path.join(process.cwd(), 'temp');
    for(const i in items) {
        const item = items[i];        
        const outputPath = `./public/images/enchants/EdgeOverlay-${cleanName(item.name)}.webp`;
        if(await fs.access(outputPath).then(() => true).catch(() => false)) continue;

        const inputPath = `./public/images/items/${cleanName(item.name)}.avif`;

        try {
            // Ensure temp directory exists
            await fs.mkdir(tempDir, { recursive: true });
            console.log(`Created temp directory at: ${tempDir}`);

            console.log(`Starting overlay generation for ${inputPath}`);
            
            // Load and process the original image
            const image = sharp(inputPath);
            const metadata = await image.metadata();
            const { width, height } = metadata;
            console.log(`Image dimensions: ${width}x${height}`);

            // Get the edge data using Sobel operators
            console.log('Processing edge detection...');
            const { data } = await image
                .greyscale()
                .raw()
                .toBuffer({ resolveWithObject: true });

            // Apply Sobel operator for edge detection
            const edges = [];
            const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
            const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
            const threshold = 30;

            for (let y = 1; y < height - 1; y++) {
                for (let x = 1; x < width - 1; x++) {
                    let pixelX = 0;
                    let pixelY = 0;

                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            const idx = ((y + i) * width + (x + j));
                            const gray = data[idx];
                            pixelX += gray * sobelX[(i + 1) * 3 + (j + 1)];
                            pixelY += gray * sobelY[(i + 1) * 3 + (j + 1)];
                        }
                    }

                    const magnitude = Math.sqrt(pixelX * pixelX + pixelY * pixelY);
                    if (magnitude > threshold) {
                        edges.push({ x: x, y: y });
                    }
                }
            }

            // After edge detection
            console.log(`Found ${edges.length} edge points`);

            // Create 20 frames of animation
            console.log('Generating animation frames...');
            const frames = [];
            const numFrames = 20;
            
            for (let frame = 0; frame < numFrames; frame++) {
                console.log(`Processing frame ${frame + 1}/${numFrames}`);
                // Create a new frame buffer
                const frameBuffer = Buffer.alloc(width * height * 4);
                
                edges.forEach((edge, index) => {
                    const phaseShift = (index / edges.length + frame / numFrames) * Math.PI * 2;
                    const alpha = Math.floor((Math.sin(phaseShift) + 1) / 2 * 255);
                    
                    // Create a larger glow effect manually
                    for (let dy = -2; dy <= 2; dy++) {
                        for (let dx = -2; dx <= 2; dx++) {
                            const px = edge.x + dx;
                            const py = edge.y + dy;
                            if (px >= 0 && px < width && py >= 0 && py < height) {
                                const distance = Math.sqrt(dx * dx + dy * dy);
                                const intensity = Math.max(0, 1 - (distance / 2.5));
                                const idx = (py * width + px) * 4;
                                
                                // Add glow color (golden)
                                frameBuffer[idx] = Math.max(frameBuffer[idx], Math.floor(255 * intensity));     // R
                                frameBuffer[idx + 1] = Math.max(frameBuffer[idx + 1], Math.floor(215 * intensity)); // G
                                frameBuffer[idx + 2] = Math.max(frameBuffer[idx + 2], Math.floor(0 * intensity));   // B
                                frameBuffer[idx + 3] = Math.max(frameBuffer[idx + 3], Math.floor(alpha * intensity));// A
                            }
                        }
                    }
                });

                frames.push(frameBuffer);
            }

            // Create temporary WebP files for each frame
            const frameFiles = [];
            for (let i = 0; i < frames.length; i++) {
                const framePath = path.join(tempDir, `frame_${i}.webp`);
                console.log(`Creating frame ${i + 1}/${frames.length}`);
                
                await sharp(frames[i], {
                    raw: {
                        width,
                        height,
                        channels: 4
                    }
                })
                .webp()
                .toFile(framePath);
                
                frameFiles.push(framePath);
            }

            // Build webpmux command
            let command = 'webpmux';
            frameFiles.forEach((framePath, index) => {
                // Each frame: duration 100ms, position at (0,0), dispose method 1 (clear), no blending
                command += ` -frame ${framePath} +100+0+0+1-b`;
            });
            command += ' -loop 0'; // infinite loop
            command += ` -o ${outputPath}`;

            // Execute webpmux command
            console.log('Creating animated WebP with webpmux...');
            console.log(`Executing command: ${command}`);
            const { stdout, stderr } = await execAsync(command);
            if (stdout) console.log(stdout);
            if (stderr) console.error(stderr);

            // Clean up temporary files
            console.log('Cleaning up temporary files...');
            for (const file of frameFiles) {
                await fs.unlink(file);
            }
            await fs.rmdir(tempDir);

            console.log(`Successfully created animated WebP at ${outputPath}`);
            const stats = await fs.stat(outputPath);
            console.log(`File size: ${stats.size} bytes`);
            console.log(`Animation length: ${frames.length * 100}ms`);

        } catch (error) {
            console.error(`Error generating overlay:`, error);
        }
    }
}

// Execute the function
generateEnchantOverlays().catch(console.error);
