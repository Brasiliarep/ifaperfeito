const Jimp = require('jimp');

async function processImage(fileIn, fileOut) {
    try {
        const img = await Jimp.read(fileIn);
        
        img.scan(0, 0, img.bitmap.width, img.bitmap.height, function(x, y, idx) {
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];
            
            // Remove pure white/near white background
            if (r > 240 && g > 240 && b > 240) {
                this.bitmap.data[idx + 3] = 0; 
            }
        });

        await img.writeAsync(fileOut);
        console.log("Processed " + fileOut);
    } catch (e) {
        console.error("Error processing " + fileIn, e);
    }
}

async function main() {
    await processImage('C:\\Users\\Sérgio França\\.gemini\\antigravity-ide\\brain\\d0859419-146d-4508-9180-52cdb5917cf2\\media__1783791483697.png', 'c:\\aPP iFA\\novo\\public\\esteira_circular.png');
}

main();
