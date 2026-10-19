/* Portable production builder: JSX -> real React, with local, versioned GSAP.
   This custom path needs only TypeScript after npm install, no CDN or service. */
const fs = require('node:fs');
const path = require('node:path');
let ts;
try { ts = require('typescript'); } catch { console.error('Missing TypeScript. Run npm install in the source folder first.'); process.exit(1); }
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'dist');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'assets'), { recursive: true });
fs.cpSync(path.join(root, 'public'), out, { recursive: true });
const code = name => fs.readFileSync(path.join(root, 'src', name), 'utf8')
  .replace(/^import .*?;\s*$/gm, '')
  .replace(/export default function /g, 'function ')
  .replace(/export (function|const|let) /g, '$1 ');
const input = `const {useEffect,useLayoutEffect,useRef,useState}=React;
const gsap=window.gsap,ScrollTrigger=window.ScrollTrigger,ScrollToPlugin=window.ScrollToPlugin;
${code('content.js')}\n${code('motion.js')}\n${code('App.jsx')}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(React.StrictMode,null,React.createElement(App)));`;
const compiled = ts.transpileModule(input, { fileName: 'portfolio.tsx', compilerOptions: { jsx: ts.JsxEmit.React, target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.None }, reportDiagnostics: true });
const errors = (compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error);
if (errors.length) { console.error(errors.map(d => ts.flattenDiagnosticMessageText(d.messageText, '\n')).join('\n')); process.exit(1); }
fs.writeFileSync(path.join(out, 'assets/app.js'), `/* Muhammad Muhid / React portfolio */\n(function(React,ReactDOM){'use strict';\n${compiled.outputText}\n})(window.React,window.ReactDOM);`);
fs.copyFileSync(path.join(root, 'src/styles.css'), path.join(out, 'assets/styles.css'));
const vendors = ['react.production.min.js','react-dom.production.min.js','gsap.min.js','ScrollTrigger.min.js','ScrollToPlugin.min.js'];
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
html = html.replace('<!-- STYLES -->', '<link rel="stylesheet" href="./assets/styles.css" />');
html = html.replace('<!-- SCRIPTS -->', vendors.map(name => `<script defer src="./vendor/${name}"></script>`).join('\n  ') + '\n  <script defer src="./assets/app.js"></script>');
fs.writeFileSync(path.join(out, 'index.html'), html);
// Standalone file uses identical compiled code, images, and resume as the hosted build.
const types = { '.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.pdf':'application/pdf' };
const inlineResource = relative => { const target = path.join(out, relative); if (!fs.existsSync(target)) throw new Error('Missing asset: ' + target); return 'data:' + types[path.extname(target)] + ';base64,' + fs.readFileSync(target).toString('base64'); };
let standalone = html.replace('<link rel="stylesheet" href="./assets/styles.css" />', () => '<style>' + fs.readFileSync(path.join(out, 'assets/styles.css'), 'utf8') + '</style>');
for (const name of vendors) standalone = standalone.replace(`<script defer src="./vendor/${name}"></script>`, () => '<script>' + fs.readFileSync(path.join(out, 'vendor', name), 'utf8').replace(/<\/script/gi, '<\\/script') + '</script>');
standalone = standalone.replace('<script defer src="./assets/app.js"></script>', () => '<script>' + fs.readFileSync(path.join(out, 'assets/app.js'), 'utf8').replace(/<\/script/gi, '<\\/script') + '</script>');
for (const relative of ['images/muhammad-muhid.jpg','Muhammad-Muhid-Resume.pdf','favicon.svg']) standalone = standalone.split('./' + relative).join(inlineResource(relative));
fs.writeFileSync(path.join(root, 'Muhammad-Muhid-Preview.html'), standalone);
console.log('Built dist/ and Muhammad-Muhid-Preview.html. Local React 18.3.1 + GSAP 3.15.0.');
