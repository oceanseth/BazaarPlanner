import Item from '../js/Item.js';
import items from '../js/items.js';
async function generateEnchantOverlays() {
    for (const item of items) {
        for (const enchant of item.enchants) {        
        // For Golden enchant, create edge detection overlay
        if (enchant === 'Golden') {
            const img = this.element.querySelector('img');
            await new Promise(resolve => {
                if (img.complete) {
                    resolve();
                } else {
                    img.onload = resolve;
                }
            });
            
            // Get rendered dimensions
            const renderedWidth = img.clientWidth;
            const renderedHeight = img.clientHeight;
            console.log('Dimensions:', renderedWidth, renderedHeight);

            // Create canvas for processing at intrinsic size
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            // Get image data for processing
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const edges = await Item.detectEdges(imageData);

            // Create frames with fading edges
            const numFrames = 20;
            const frameDelay = 50; // 50ms per frame = 1 second total animation
            const frames = [];

            for (let frame = 0; frame < numFrames; frame++) {
                const overlayCanvas = document.createElement('canvas');
                overlayCanvas.width = renderedWidth;
                overlayCanvas.height = renderedHeight;
                const overlayCtx = overlayCanvas.getContext('2d');

                // Scale the context to match rendered size
                const scaleX = renderedWidth / img.naturalWidth;
                const scaleY = renderedHeight / img.naturalHeight;
                overlayCtx.scale(scaleX, scaleY);

                // Setup drawing style
                overlayCtx.strokeStyle = '#ffd700';
                overlayCtx.shadowColor = '#ffd700';
                overlayCtx.shadowBlur = 5;

                // Draw each edge with its own alpha based on position and current frame
                edges.forEach((edge, index) => {
                    // Calculate alpha based on frame number and edge position
                    const phaseShift = (index / edges.length + frame / numFrames) * Math.PI * 2;
                    const alpha = (Math.sin(phaseShift) + 1) / 2;

                    overlayCtx.globalAlpha = alpha;
                    overlayCtx.beginPath();
                    overlayCtx.moveTo(edge.x1, edge.y1);
                    overlayCtx.lineTo(edge.x2, edge.y2);
                    overlayCtx.stroke();
                });

                frames.push({
                    data: overlayCanvas.toDataURL('image/png'),
                    delay: frameDelay,
                    width: renderedWidth,
                    height: renderedHeight
                });
            }

            try {
                const dataUrl = await window.webpEncoder.encode(frames);
                
                Item.generatedImages[this.name][this.enchant] = dataUrl;
                return dataUrl;
            } catch (e) {
                console.error('WebP encoding failed:', e);
                return frames[0].data; // Fallback to first frame
            }
        }
        return null;
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

generateEnchantOverlays();