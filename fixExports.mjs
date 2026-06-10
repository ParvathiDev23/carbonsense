import fs from 'fs';
import path from 'path';

function fixFile(filePath, componentName) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes(`export default ${componentName};`)) {
    content += `\n\n${componentName}.propTypes = {\n};\n\nexport default ${componentName};\n`;
  }
  fs.writeFileSync(filePath, content);
}

const dir = './src/components';
fixFile(path.join(dir, 'ActionCarousel.jsx'), 'ActionCarousel');
fixFile(path.join(dir, 'Calculator.jsx'), 'Calculator');
fixFile(path.join(dir, 'Dashboard.jsx'), 'Dashboard');
fixFile(path.join(dir, 'Hero.jsx'), 'Hero');

let hero = fs.readFileSync('./src/components/Hero.jsx', 'utf8');
if (!hero.includes('import { ChevronDown }')) {
  hero = hero.replace('import PropTypes from \'prop-types\';', 'import PropTypes from \'prop-types\';\nimport { ChevronDown } from \'lucide-react\';');
  fs.writeFileSync('./src/components/Hero.jsx', hero);
}

