import rehypeParse from "rehype-parse"
import rehypeStringify from "rehype-stringify"
import {unified} from "unified"

import {rehypeCloudinaryImageSize} from "../dist/index.js"

const processor = unified()
    .use(rehypeParse, {fragment: true})
    .use(rehypeCloudinaryImageSize)
    .use(rehypeStringify)

const file = await processor.process(
    // eslint-disable-next-line quotes
    '<img src="https://res.cloudinary.com/bradgarropy/image/upload/f_auto,q_auto/bradgarropy.com/pages/home/profile.jpg">',
)

const html = file.toString()
console.log(html)
