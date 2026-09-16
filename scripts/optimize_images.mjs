import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = path.resolve('./public/assets-local');
const outputDir = path.resolve('./public/optimized');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const mapping = {
  // Quote hero
  '0VrSAI4.png': 'quote-hero.webp',
  // Services & Gallery header hero
  'u5CQA2Z.png': 'services-gallery-hero.webp',
  // About hero
  'Y5hfQAX.png': 'about-hero.webp',
  // Logo
  'X4qER1V.png': 'mga-logo-clean.webp',

  // Team
  'TZOwaqs.png': 'team-mattias.webp',
  'DSxbqCV.png': 'team-johan.webp',
  'JVsQMgW.png': 'team-alexander.webp',
  'i1KNHpq.png': 'team-marcus.webp',
  'VUIOJiY.png': 'team-erik.webp',
  'WlpQoJX.jpeg': 'team-samuel.webp',

  // Services
  'H0iDPl1.png': 'service-markarbete-hd.webp',
  'Bwm2Klw.png': 'service-dranering-hd.webp',
  'cjzgGp3.png': 'service-betong-hd.webp',
  'eUStLab.png': 'service-tomtplanering-hd.webp',

  // Gallery
  'qqH2wjc.png': 'gallery-item-1.webp',
  'Zxi0lFY.png': 'gallery-item-2.webp',
  'iOZ3fKq.png': 'gallery-item-3.webp',
  'GBa078V.png': 'gallery-item-5.webp',
  '6ADPwFZ.png': 'gallery-item-6.webp',
  'CJCgrPR.png': 'gallery-item-7.webp',
  'SK4JWyV.png': 'gallery-item-8.webp',
  'kdHfJcA.png': 'gallery-item-9.webp',
  '9AC8ILh.png': 'gallery-item-10.webp',
  'DTx1FEI.png': 'gallery-item-11.webp',
  'P9ulbcY.png': 'gallery-item-12.webp',
};

async function optimizeImages() {
  console.log('Optimizing images with Sharp...');
  
  for (const [sourceFile, targetFile] of Object.entries(mapping)) {
    const srcPath = path.join(inputDir, sourceFile);
    const destPath = path.join(outputDir, targetFile);

    if (!fs.existsSync(srcPath)) {
      console.warn(`File not found: ${srcPath}`);
      continue;
    }

    const statBefore = fs.statSync(srcPath);
    
    // Determine max dimension based on usage
    let maxWidth = 1920;
    let quality = 82;

    if (targetFile.startsWith('team-')) {
      maxWidth = 600;
      quality = 85;
    } else if (targetFile.startsWith('gallery-')) {
      maxWidth = 1200;
      quality = 82;
    } else if (targetFile.includes('logo')) {
      maxWidth = 500;
      quality = 90;
    }

    try {
      await sharp(srcPath)
        .resize({ width: maxWidth, withoutEnlargement: true })
        .webp({ quality, effort: 6 })
        .toFile(destPath);

      const statAfter = fs.statSync(destPath);
      const savings = ((1 - statAfter.size / statBefore.size) * 100).toFixed(1);
      console.log(`✓ ${sourceFile} (${(statBefore.size / 1024).toFixed(0)}KB) -> ${targetFile} (${(statAfter.size / 1024).toFixed(0)}KB) [-${savings}%]`);
    } catch (err) {
      console.error(`Error processing ${sourceFile}:`, err);
    }
  }

  // Also copy videos directly
  ['cQv8gpJ.mp4', 'fTDcor7.mp4'].forEach(video => {
    const src = path.join(inputDir, video);
    const dest = path.join(outputDir, video);
    if (fs.existsSync(src) && !fs.existsSync(dest)) {
      fs.copyFileSync(src, dest);
      console.log(`✓ Copied video ${video} to /optimized/`);
    }
  });

  console.log('Image optimization complete!');
}

optimizeImages();
