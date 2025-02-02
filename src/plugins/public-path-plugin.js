import { posix } from 'path';

/**
 * @param {Object} [options]
 * @param {string} [options.publicPath] A URL path to prepend to asset URLs instead of using `new URL(url, import.meta.url)`
 * @param {(assetInfo: Parameters<import('rollup').ResolveFileUrlHook>[0]) => boolean} [options.filter] Control whether each asset should be resolved.
 * @returns {import('rollup').Plugin}
 */
export default function publicPathPlugin({ publicPath, filter } = {}) {
	return {
		name: 'public-path',
		resolveFileUrl(assetInfo) {
			if (!publicPath || (filter && !filter(assetInfo))) return null;
			const { fileName } = assetInfo;
			return JSON.stringify(posix.join(publicPath, fileName));
		}
	};
}
