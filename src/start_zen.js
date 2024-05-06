import { join, resolve } from "path";

import { Server, some_colors, Ops } from "rawx";


const base = resolve(".");
const src = resolve(base, "src");
const build = resolve(src, "build.js");
const zsa_styles = resolve("src", "zsa", "zsa.scss");
const dist = join(base, "dist");
const out_css = join(dist, "zsa.css");
const out_script = join(dist, "script");

new Server({
	name: "stage_zen",
	procs: [
		{
			type: "spawn",
			command: "rm",
			args: ["-rf", `${dist}`],
			chain_exit: true,
			shell: true,
			cwd: base,
		},
		{
			type: "spawn",
			command: "mkdir",
			args: dist,
			chain_exit: true,
			silence: true,
		},
		{
			type: "spawn",
			command: `node ${build}`,
			args: [
				zsa_styles,
				out_css,
				out_script,
				"configure.zsa.io/moonlander/layouts"
			]
		}
	],
	debug: 4,
	trigger_index: 0,
	watch: {
        paths: [src],
        poll: 4000,
        colors: {
            default: some_colors.forky,
        },
        match: {
            include: ["*.scss"],
        }
    },
	kill_delay: 400
});
