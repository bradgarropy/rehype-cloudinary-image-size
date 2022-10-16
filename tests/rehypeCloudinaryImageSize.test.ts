import rehypeParse from "rehype-parse"
import rehypeStringify from "rehype-stringify"
import {unified} from "unified"
import {expect, test, vi} from "vitest"

import {rehypeCloudinaryImageSize} from "../src"

const mockFetch = vi.fn()

mockFetch.mockResolvedValue({
    json: () => {
        const response = {output: {width: 100, height: 100}}
        return response
    },
})

global.fetch = mockFetch

test("ignores other elements", async () => {
    const processor = unified()
        .use(rehypeParse, {fragment: true})
        .use(rehypeCloudinaryImageSize)
        .use(rehypeStringify)

    const file = await processor.process("<p>hello world</p>")

    const html = file.toString()
    expect(html).toEqual("<p>hello world</p>")
})

test("ignores image elements with no attributes", async () => {
    const processor = unified()
        .use(rehypeParse, {fragment: true})
        .use(rehypeCloudinaryImageSize)
        .use(rehypeStringify)

    const file = await processor.process("<img>")

    const html = file.toString()
    expect(html).toEqual("<img>")
})

test("ignores image elements with no source attribute", async () => {
    const processor = unified()
        .use(rehypeParse, {fragment: true})
        .use(rehypeCloudinaryImageSize)
        .use(rehypeStringify)

    const file = await processor.process(
        // eslint-disable-next-line quotes
        '<img alt="description">',
    )

    const html = file.toString()

    expect(html).toEqual(
        // eslint-disable-next-line quotes
        '<img alt="description">',
    )
})

test("ignores image elements with non-string source attribute", async () => {
    const processor = unified()
        .use(rehypeParse, {fragment: true})
        .use(rehypeCloudinaryImageSize)
        .use(rehypeStringify)

    const file = await processor.process(
        // eslint-disable-next-line quotes
        '<img src="true">',
    )

    const html = file.toString()

    expect(html).toEqual(
        // eslint-disable-next-line quotes
        '<img src="true">',
    )
})

test("ignores non-cloudinary images", async () => {
    const processor = unified()
        .use(rehypeParse, {fragment: true})
        .use(rehypeCloudinaryImageSize)
        .use(rehypeStringify)

    const file = await processor.process(
        // eslint-disable-next-line quotes
        '<img src="https://example.com/photo.jpg">',
    )

    const html = file.toString()

    expect(html).toEqual(
        // eslint-disable-next-line quotes
        '<img src="https://example.com/photo.jpg">',
    )
})

test("adds width and height to cloudinary images", async () => {
    const processor = unified()
        .use(rehypeParse, {fragment: true})
        .use(rehypeCloudinaryImageSize)
        .use(rehypeStringify)

    const file = await processor.process(
        // eslint-disable-next-line quotes
        '<img src="https://res.cloudinary.com/photo.jpg">',
    )

    const html = file.toString()

    expect(html).toEqual(
        // eslint-disable-next-line quotes
        '<img src="https://res.cloudinary.com/photo.jpg" width="100" height="100">',
    )
})

test("handles multiple good images", async () => {
    const processor = unified()
        .use(rehypeParse, {fragment: true})
        .use(rehypeCloudinaryImageSize)
        .use(rehypeStringify)

    const file = await processor.process(
        // eslint-disable-next-line quotes
        '<img src="https://res.cloudinary.com/photo.jpg"><img src="https://res.cloudinary.com/picture.jpg">',
    )

    const html = file.toString()

    expect(html).toEqual(
        // eslint-disable-next-line quotes
        '<img src="https://res.cloudinary.com/photo.jpg" width="100" height="100"><img src="https://res.cloudinary.com/picture.jpg" width="100" height="100">',
    )
})

test("handles one good and one bad image", async () => {
    const processor = unified()
        .use(rehypeParse, {fragment: true})
        .use(rehypeCloudinaryImageSize)
        .use(rehypeStringify)

    const file = await processor.process(
        // eslint-disable-next-line quotes
        '<img src="https://res.cloudinary.com/photo.jpg"><img src="https://example.com/photo.jpg">',
    )

    const html = file.toString()

    expect(html).toEqual(
        // eslint-disable-next-line quotes
        '<img src="https://res.cloudinary.com/photo.jpg" width="100" height="100"><img src="https://example.com/photo.jpg">',
    )
})

test("handles multiple bad images", async () => {
    const processor = unified()
        .use(rehypeParse, {fragment: true})
        .use(rehypeCloudinaryImageSize)
        .use(rehypeStringify)

    const file = await processor.process(
        // eslint-disable-next-line quotes
        '<img src="https://example.com/photo.jpg"><img alt="description">',
    )

    const html = file.toString()

    expect(html).toEqual(
        // eslint-disable-next-line quotes
        '<img src="https://example.com/photo.jpg"><img alt="description">',
    )
})
