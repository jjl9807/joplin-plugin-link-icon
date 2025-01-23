import type MarkdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';
import markdownItBracketedSpans from 'markdown-it-bracketed-spans';

const MAKRDOWN_IT_ATTRS_CONFIG = {
	allowedAttributes: ['id'],
};

module.exports = {
	default: function (context) {
		return {
			plugin: function (markdownIt: MarkdownIt, pluginOptions) {
				markdownIt.use(markdownItAttrs, MAKRDOWN_IT_ATTRS_CONFIG).use(markdownItBracketedSpans);
			},
			assets: function () {
				return [{ name: 'webview/index.js' }, { name: 'webview/style.css' }];
			},
		}
	}
}