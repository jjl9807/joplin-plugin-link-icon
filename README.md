# Joplin Note Link Icon

[![Joplin](https://img.shields.io/npm/v/joplin-plugin-link-icon?logo=joplin&label=Joplin)](https://joplinapp.org/plugins/plugin/com.jjl9807.LinkIcon/)  [![GitHub](https://img.shields.io/github/v/release/jjl9807/joplin-plugin-link-icon?label=GitHub%20Release&logo=github)](https://github.com/jjl9807/joplin-plugin-link-icon/releases/latest) [![npm](https://img.shields.io/npm/v/joplin-plugin-link-icon?label=NPM%20Package&logo=npm)](https://www.npmjs.com/package/joplin-plugin-link-icon)

This is a Joplin plugin to display icons for links in your notes.

![](assets/screenshot.png)

## Features

- Automatically detect the links in current note, retrieve the corresponding icons through favicon providers' API (currently only support Google), and display them in the preview area.
- Fallback to the default icon when the favicon provider's API is unavailable.

![](assets/demo.png)

## Roadmap

- Additional favicon provider support (such as DuckDuckGo, Icon Horse, FAVICONE, Favicon Kit, etc.).

## Acknowledgements

This plugin is mainly inspired by the following project:

- **[joplin-plugin-note-link-system](https://github.com/ylc395/joplin-plugin-note-link-system)** by [**ylc395**](https://github.com/ylc395) <br>
  *A complete Link System for Joplin.*

Thank you for your valuable contributions to the open source community!

## License
[MIT License](LICENSE.md) © jl.jiang (jjl9807)
