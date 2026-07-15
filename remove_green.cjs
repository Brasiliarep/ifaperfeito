const Jimp = require('jimp');

async function processImage(fileIn, fileOut) {
    try {
        const img = await Jimp.read(fileIn);
        
        img.scan(0, 0, img.bitmap.width, img.bitmap.height, function(x, y, idx) {
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];
            const a = this.bitmap.data[idx + 3];
            
            // Neon green is high G, low R, low B
            if (g > 150 && r < 120 && b < 120) {
                this.bitmap.data[idx + 3] = 0; // Fully transparent
            } else if (g > r && g > b && g > 60) {
                // If it's more green than red/blue, it's a green fringe.
                // We make the pixel partially transparent based on green dominance
                const greenDominance = g - Math.max(r, b);
                
                // Also remove the green tint by balancing G with R and B
                const averageColor = Math.floor((r + b) / 2);
                this.bitmap.data[idx + 1] = averageColor; 
                
                // Reduce alpha
                const newAlpha = Math.max(0, a - greenDominance * 2);
                this.bitmap.data[idx + 3] = newAlpha;
            }
        });

        await img.writeAsync(fileOut);
        console.log("Processed " + fileOut);
    } catch (e) {
        console.error("Error processing " + fileIn, e);
    }
}

async function main() {
    // Rerun on the original green images
    await processImage('C:\\Users\\Sérgio França\\.gemini\\antigravity-ide\\brain\\d0859419-146d-4508-9180-52cdb5917cf2\\buzio_fechado_verde_1783791019077.png', 'c:\\aPP iFA\\novo\\public\\buzio_fechado.png');
    await processImage('C:\\Users\\Sérgio França\\.gemini\\antigravity-ide\\brain\\d0859419-146d-4508-9180-52cdb5917cf2\\buzio_aberto_verde_1783791039788.png', 'c:\\aPP iFA\\novo\\public\\buzio_aberto.png');
}

main();
