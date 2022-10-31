# 🖼 rehype cloudinary image size

[![version][version-badge]][npm]
[![downloads][downloads-badge]][npm]
[![size][size-badge]][bundlephobia]
[![github actions][github-actions-badge]][github-actions]
[![coverage][codecov-badge]][codecov]
[![typescript][typescript-badge]][typescript]
[![contributing][contributing-badge]][contributing]
[![contributors][contributors-badge]][contributors]
[![discord][discord-badge]][discord]

_[Rehype][rehype] plugin to add width and height to [Cloudinary][cloudinary] images._

## 📦 Installation

This package is hosted on [npm][npm].

```bash
npm install @bradgarropy/rehype-cloudinary-image-size
```

## 🥑 Usage

This is a [rehype][rehype] plugin for use in a [unified][unified] chain that modifies HTML syntax trees. It adds `width` and `height` attributes to all `img` tags that reference images hosted on [Cloudinary][cloudinary].

```typescript
import {rehypeCloudinaryImageSize} from "@bradgarropy/rehype-cloudinary-image-size"
import rehypeParse from "rehype-parse"
import rehypeStringify from "rehype-stringify"
import {unified} from "unified"

const processor = unified()
    .use(rehypeParse, {fragment: true})
    .use(rehypeCloudinaryImageSize)
    .use(rehypeStringify)

const html = await processor.process(
    '<img src="https://res.cloudinary.com/bradgarropy/image/upload/f_auto,q_auto/bradgarropy.com/pages/home/profile.jpg">',
)

console.log(html)

// output
// <img
//   src="https://res.cloudinary.com/bradgarropy/image/upload/f_auto,q_auto/bradgarropy.com/pages/home/profile.jpg"
//   width="460"
//   height="460"
// >
```

## 📖 API Reference

### `use(rehypeCloudinaryImageSize)`

This plugin only adds `width` and `height` attributes to images hosted on Cloudinary. All other sources are ignored. Any existing attributes are preserved.

```html
<!-- input -->
<img
    src="https://res.cloudinary.com/bradgarropy/image/upload/f_auto,q_auto/bradgarropy.com/pages/home/profile.jpg"
    alt="description"
/>

<!-- output -->
<img
    src="https://res.cloudinary.com/bradgarropy/image/upload/f_auto,q_auto/bradgarropy.com/pages/home/profile.jpg"
    alt="description"
    width="460"
    height="460"
/>
```

## ❔ Questions

🐛 report bugs by filing [issues][issues]  
📢 provide feedback with [issues][issues] or on [twitter][twitter]  
🙋🏼‍♂️ use my [ama][ama] or [twitter][twitter] to ask any other questions

## ✨ contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://bradgarropy.com"><img src="https://avatars.githubusercontent.com/u/11336745?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Brad Garropy</b></sub></a><br /><a href="https://github.com/bradgarropy/rehype-cloudinary-image-size/commits?author=bradgarropy" title="Code">💻</a> <a href="https://github.com/bradgarropy/rehype-cloudinary-image-size/commits?author=bradgarropy" title="Documentation">📖</a> <a href="https://github.com/bradgarropy/rehype-cloudinary-image-size/commits?author=bradgarropy" title="Tests">⚠️</a> <a href="#infra-bradgarropy" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

[codecov]: https://app.codecov.io/gh/bradgarropy/rehype-cloudinary-image-size
[contributing]: https://github.com/bradgarropy/rehype-cloudinary-image-size/blob/master/contributing.md
[contributors]: #-contributors
[npm]: https://www.npmjs.com/package/@bradgarropy/rehype-cloudinary-image-size
[codecov-badge]: https://img.shields.io/codecov/c/github/bradgarropy/rehype-cloudinary-image-size?style=flat-square
[version-badge]: https://img.shields.io/npm/v/@bradgarropy/rehype-cloudinary-image-size.svg?style=flat-square
[downloads-badge]: https://img.shields.io/npm/dt/@bradgarropy/rehype-cloudinary-image-size?style=flat-square
[contributing-badge]: https://img.shields.io/badge/PRs-welcome-success?style=flat-square
[contributors-badge]: https://img.shields.io/github/all-contributors/bradgarropy/rehype-cloudinary-image-size?style=flat-square
[issues]: https://github.com/bradgarropy/rehype-cloudinary-image-size/issues
[twitter]: https://twitter.com/bradgarropy
[ama]: https://bradgarropy.com/ama
[bundlephobia]: https://bundlephobia.com/result?p=@bradgarropy/rehype-cloudinary-image-size
[size-badge]: https://img.shields.io/bundlephobia/minzip/@bradgarropy/rehype-cloudinary-image-size?style=flat-square
[github-actions]: https://github.com/bradgarropy/rehype-cloudinary-image-size/actions
[github-actions-badge]: https://img.shields.io/github/workflow/status/bradgarropy/rehype-cloudinary-image-size/%F0%9F%9A%80%20release?style=flat-square
[typescript]: https://www.typescriptlang.org/dt/search?search=%40bradgarropy%2Frehype-cloudinary-image-size
[typescript-badge]: https://img.shields.io/npm/types/@bradgarropy/rehype-cloudinary-image-size?style=flat-square
[discord]: https://bradgarropy.com/discord
[discord-badge]: https://img.shields.io/discord/748196643140010015?style=flat-square
[rehype]: https://github.com/rehypejs/rehype
[unified]: https://github.com/unifiedjs/unified
[cloudinary]: https://cloudinary.com
