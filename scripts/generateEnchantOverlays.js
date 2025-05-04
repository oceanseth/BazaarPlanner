import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import {items} from '../items.js';

async function generateEnchantOverlays() {
    for (const i in items) {
        const item = items[i];
        const inputPath = `./public/images/items/${item.name}.avif`;
        
        for (const enchant in item.enchants) {
            if (enchant === 'Golden') {
                // Load the image directly using sharp
                const image = sharp(inputPath);
                const metadata = await image.metadata();
                const { width, height } = metadata;

                // Get image data for edge detection
                const { data } = await image
                    .raw()
                    .toBuffer({ resolveWithObject: true });

                const imageData = {
                    data,
                    width,
                    height
                };
                console.log("detecting edges");
                const edges = await detectEdges(imageData);
                console.log("edges detected");

                // Create frames with fading edges
                const numFrames = 20;
                const frameDelay = 50; // 50ms per frame

                try {
                    console.log(`Processing ${edges.length} edges for ${item.id}`);
                    
                    // Reduce number of edges by sampling every nth edge
                    const samplingRate = Math.ceil(edges.length / 1000); // Limit to ~1000 edges
                    const sampledEdges = edges.filter((_, index) => index % samplingRate === 0);
                    console.log(`Reduced to ${sampledEdges.length} edges`);

                    const frameBuffers = [];
                    for (let frame = 0; frame < numFrames; frame++) {
                        console.log(`Creating frame ${frame + 1}/${numFrames}`);
                        
                        // Create a new blank image for this frame
                        const frameBuffer = await sharp({
                            create: {
                                width,
                                height,
                                channels: 4,
                                background: { r: 0, g: 0, b: 0, alpha: 0 }
                            }
                        })
                        .composite(sampledEdges.map((edge, index) => {
                            const phaseShift = (index / sampledEdges.length + frame / numFrames) * Math.PI * 2;
                            const alpha = Math.floor((Math.sin(phaseShift) + 1) / 2 * 255);
                            return {
                                input: {
                                    create: {
                                        width: 3,
                                        height: 3,
                                        channels: 4,
                                        background: { r: 255, g: 215, b: 0, alpha }
                                    }
                                },
                                left: Math.floor(edge.x1),
                                top: Math.floor(edge.y1),
                                blend: 'add'
                            };
                        }))
                        .png()
                        .toBuffer();

                        frameBuffers.push(frameBuffer);
                    }

                    console.log('Creating final WebP animation...');
                    await sharp(frameBuffers[0], {
                        animated: true,
                        pages: -1  // Tell sharp to expect multiple pages
                    })
                    .joinChannel(frameBuffers.slice(1))  // Add the rest of the frames
                    .webp({
                        quality: 80,
                        loop: 0,
                        delay: Array(frameBuffers.length).fill(frameDelay),
                        pageHeight: height,
                    })
                    .toFile(`./public/images/enchants/Golden${item.name}.webp`);

                    console.log(`Successfully generated golden overlay for ${item.name}`);
                } catch (e) {
                    console.error(`Failed to generate golden overlay for ${item.name}:`, e);
                }
                process.exit(0);
            }
        }
    }
}

// Helper function for edge detection
async function detectEdges(imageData) {
    const edges = [];
    const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
    const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
    const threshold = 30;

    const { data, width, height } = imageData;

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            let pixelX = 0;
            let pixelY = 0;

            // Apply Sobel operators
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const idx = ((y + i) * width + (x + j)) * 4;
                    const gray = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
                    pixelX += gray * sobelX[(i + 1) * 3 + (j + 1)];
                    pixelY += gray * sobelY[(i + 1) * 3 + (j + 1)];
                }
            }

            const magnitude = Math.sqrt(pixelX * pixelX + pixelY * pixelY);
            if (magnitude > threshold) {
                edges.push({ x1: x, y1: y, x2: x + pixelX/magnitude, y2: y + pixelY/magnitude });
            }
        }
    }
    return edges;
}

// Execute the function
generateEnchantOverlays().catch(console.error);