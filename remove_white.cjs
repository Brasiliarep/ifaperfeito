const Jimp = require('jimp');

async function processImage(fileIn, fileOut) {
    try {
        const img = await Jimp.read(fileIn);
        
        // Scan all pixels
        img.scan(0, 0, img.bitmap.width, img.bitmap.height, function(x, y, idx) {
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];
            
            // Check if the pixel is near-white (background)
            if (r > 230 && g > 230 && b > 230) {
                // To avoid jagged edges, we can apply some simple anti-aliasing logic 
                // But simple transparency is usually okay for these isolated images
                // Let's make it fully transparent
                this.bitmap.data[idx + 3] = 0; 
            } else if (r > 210 && g > 210 && b > 210) {
                // Edge transition smoothing (soft transparency)
                this.bitmap.data[idx + 3] = Math.max(0, 255 - ((r - 210) * 5));
            }
        });

        await img.writeAsync(fileOut);
        console.log("Processed " + fileOut);
    } catch (e) {
        console.error("Error processing " + fileIn, e);
    }
}

async function main() {
    await processImage('c:\\aPP iFA\\novo\\public\\buzio_fechado.png', 'c:\\aPP iFA\\novo\\public\\buzio_fechado.png');
    await processImage('c:\\aPP iFA\\novo\\public\\buzio_aberto.png', 'c:\\aPP iFA\\novo\\public\\buzio_aberto.png');
}

main();
