# Changelog [0.0.2]

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Added
- `src/data/reader/css/resume.ts` - Styles specifically for creating HTML that prints to ATS-Optimized PDF
- `src/functions/minor/prep-resume-view.ts` - Same as prep-reading-view, different import. May remove in future to use generic utils across each import.
- `src/functions/rendering/createResume.ts` - Same as createReadingView, uses prep-resume-view instead.
- `LICENSE.md` - standard MIT

## Changed
- `src/functions/commands.ts` - Now imports `createResume.ts`. Added `cvhtml` function with instructions. Removed `gtsx` and `stsx` - they never really worked anyway. Need to improve them further.
- `index.ts` - Registered `cvhtml`. Removed references to `gtsx` and `stsx`.
- `README.md` - Better installation instructions.
- `src/core/cli.ts` - Removed reference to domain for docs that was never registered. Need to eventually do that, but no point directing folks to a domain that doesn't exist.

## Removed
- `test.md` - Initial complex md with custom fences and code blocks to test removed `gtsx` and `stsx` functions.
