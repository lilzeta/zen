import fs from 'fs';
import * as sass from 'sass';

// console.log("process.argv")
// console.log(process.argv)
const src_file=process.argv[2]
const out_file=process.argv[3]
const out_script_file=process.argv[4]
const uri=process.argv[5]

const result = sass.compile(src_file);
// console.log(result.css)
fs.writeFileSync(out_file, result.css);

const script=`// ==UserScript==
// @name        New script
// @namespace   Violentmonkey Scripts
// @match       *://${uri}/*
// @grant       GM_addStyle
// @version     1.0
// @author      -
// @description 5/6/2024, 12:11:31 AM
// ==/UserScript==

GM_addStyle(` + "`" + result.css + "`)"
fs.writeFileSync(out_script_file, script);
console.log("done")