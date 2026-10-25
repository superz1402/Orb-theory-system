import { Config } from "@remotion/cli/config";

// Deterministic smoke render: fixed dimensions/fps live in the composition;
// Chromium flags tuned for CI runners (no sandbox in the default container).
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setChromiumOpenGlRenderer("angle");
