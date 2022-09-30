import { join, resolve } from "path";
import { Server, some_colors, Ops } from "rawx";

const base = resolve(".");
const tar_base = resolve("src");
const tar_styles = join(tar_base, "styles");
const root = resolve("../..");
const base_ops = join(root, "o");
const base_pup = join(base_ops, "pup");
const src_styles = join(base_pup, "src", "pups", "styles");
const dist_styles = join(base_pup, "dist", "styles");

const debug = 4;
const o = Ops({ default: some_colors.TECHNICOLOR_GREEN, debug });
o._l(1, `pup_dist: ${dist_styles}`);

Server({
	name: "stage_zen",
	procs: [
		{
			type: "spawn",
			command: "rm",
			args: ["-rf", `"${tar_base}"`],
			chain_exit: true,
			shell: true,
			cwd: base,
		},
		{
			type: "spawn",
			command: "mkdir",
			args: `"${tar_styles}"`,
			chain_exit: "success",
			silence: true,
		},
		{
			type: "spawn",
			command: "cp",
			args: [
				[`"${join(src_styles, "zsa.scss")}"`, `"${tar_styles}"`],
				[`"${join(dist_styles, "zsa.css")}"`, `"${tar_styles}"`],
				[`"${join(dist_styles, "zsa.css.map")}"`, `"${tar_styles}"`],
			],
			// stop if error because it failed
			repeater_chain: "success",
		},
	],
	debug,
	kill_delay: 400,
});
