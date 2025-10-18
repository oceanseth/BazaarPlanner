import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { skills } from '../skills.js';
import { items } from '../items.js';

// Get current directory name (ES modules don't have __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get tag from command line arguments
const targetTag = process.argv[2];
if (!targetTag) {
    console.error('Please provide a tag as an argument');
    process.exit(1);
}

// Create build directory if it doesn't exist
const buildDir = path.join(__dirname, '../build');
if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
}

// Create temp directory for converted images
const tempDir = path.join(buildDir, 'temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

// Create zip files for skills and items
const skillsZip = new AdmZip();
const itemsZip = new AdmZip();
const skillsZipFileName = `${targetTag.toLowerCase()}_skills.zip`;
const itemsZipFileName = `${targetTag.toLowerCase()}_items.zip`;

// Counters for found images
let skillImageCount = 0;
let itemImageCount = 0;

// Convert and add image to zip
async function processImage(imagePath, zip, name) {
    try {
        const pngPath = path.join(tempDir, `${path.basename(imagePath, '.avif')}.png`);
        await sharp(imagePath)
            .png()
            .toFile(pngPath);
        zip.addLocalFile(pngPath);
        return true;
    } catch (error) {
        console.warn(`Warning: Failed to convert image ${name}: ${error.message}`);
        return false;
    }
}

async function main() {
    // Process skills
    for (const skill of Object.values(skills)) {
        if (skill.tags && skill.tags.includes(targetTag)) {
            const imagePath = path.join(__dirname, '..', 'public', skill.icon);
            if (fs.existsSync(imagePath)) {
                const success = await processImage(imagePath, skillsZip, skill.name);
                if (success) skillImageCount++;
            } else {
                console.warn(`Warning: Image not found for skill ${skill.name}: ${imagePath}`);
            }
        }
    }

    // Process items
    for (const item of Object.values(items)) {
        if (item.tags && item.tags.includes(targetTag)) {
            const imagePath = path.join(__dirname, '..', 'public', item.icon);
            if (fs.existsSync(imagePath)) {
                const success = await processImage(imagePath, itemsZip, item.name);
                if (success) itemImageCount++;
            } else {
                console.warn(`Warning: Image not found for item ${item.name}: ${imagePath}`);
            }
        }
    }

    // Save the zip files
    skillsZip.writeZip(path.join(buildDir, skillsZipFileName));
    itemsZip.writeZip(path.join(buildDir, itemsZipFileName));

    console.log(`Created ${skillsZipFileName} with ${skillImageCount} skill images for tag "${targetTag}"`);
    console.log(`Created ${itemsZipFileName} with ${itemImageCount} item images for tag "${targetTag}"`);

    // Clean up temp directory
    fs.rmSync(tempDir, { recursive: true, force: true });
}

main().catch(error => {
    console.error('Error:', error);
    process.exit(1);
}); 