import fs from 'fs';
import path from 'path';

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Remove trailing PropTypes import and declaration if duplicate
  content = content.replace(/import PropTypes from 'prop-types';\n\n[a-zA-Z]+\.propTypes = \{[\s\S]*?};\n\nexport default [a-zA-Z]+;\n/g, '');
  fs.writeFileSync(filePath, content);
}

const dir = './src/components';
['ActionCarousel.jsx', 'Calculator.jsx', 'Dashboard.jsx', 'Hero.jsx'].forEach(file => {
  fixFile(path.join(dir, file));
});

// App.jsx - add setUserData to dependency arrays
let appContent = fs.readFileSync('./src/App.jsx', 'utf8');
appContent = appContent.replace(/\[\]\);/g, '[setUserData]);');
// Oh wait, one is `[userData, showCalculator]` - let's be safe.
appContent = appContent.replace(/}, \[\]\);/g, '}, [setUserData]);');
fs.writeFileSync('./src/App.jsx', appContent);

// Features.jsx - remove unused React
let featuresContent = fs.readFileSync('./src/components/Features.jsx', 'utf8');
featuresContent = featuresContent.replace(/import React, \{ useEffect, useRef \} from 'react';/, "import { useEffect, useRef } from 'react';");
fs.writeFileSync('./src/components/Features.jsx', featuresContent);

// Footer.jsx - remove unused React and ExternalLink
let footerContent = fs.readFileSync('./src/components/Footer.jsx', 'utf8');
footerContent = footerContent.replace(/import React from 'react';\n/, "");
footerContent = footerContent.replace(/ExternalLink, /, "");
fs.writeFileSync('./src/components/Footer.jsx', footerContent);

// useLocalStorage.js - remove unused useEffect
let useLocalContent = fs.readFileSync('./src/hooks/useLocalStorage.js', 'utf8');
useLocalContent = useLocalContent.replace(/, useEffect /, ' ');
fs.writeFileSync('./src/hooks/useLocalStorage.js', useLocalContent);
