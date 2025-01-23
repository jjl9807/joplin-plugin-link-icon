export function getRemoteUrl(href: string) {
	return href.startsWith('http://') || href.startsWith('https://') ? href : `https://${href}`;
}

export const MARKDOWN_SCRIPT_ID = 'com.jjl9807.LinkIcon.buildIcon';

export const ROOT_ELEMENT_ID = 'rendered-md';
export const LINK_ICON_CLASS_NAME = 'link-icon-external';
export const FALLBACK_ICON_CLASS_NAME = 'link-icon-fallback';

export const GOOGLE_FAVICON_API = 'https://www.google.com/s2/favicons?sz=32&domain=';

export enum MarkdownViewEvents {
	NoteDidUpdate = 'NoteDidUpdate',
	NewNoteOpen = 'NewNoteOpen',
};

export interface QueryCurrentNoteRequest {
	event: 'queryCurrentNote';
};

export interface Note {
	id: string;
	title: string;
	created_time: string;
	updated_time: string;
	parent_id: string;
	path?: string;
	body: string;
}