import joplin from 'api';
import { ContentScriptType } from 'api/types';
import { QueryCurrentNoteRequest, MARKDOWN_SCRIPT_ID } from './utils';


joplin.plugins.register({
	onStart: async function () {
		console.info('Link Icon plugin started!');

		await joplin.contentScripts.register(
			ContentScriptType.MarkdownItPlugin,
			MARKDOWN_SCRIPT_ID,
			'./content.js',
		);
		await joplin.contentScripts.onMessage(MARKDOWN_SCRIPT_ID, async (request: QueryCurrentNoteRequest) => {
			return joplin.workspace.selectedNote();
		});
	},
});
