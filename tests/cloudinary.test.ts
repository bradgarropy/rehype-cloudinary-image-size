import {expect, test, vi} from "vitest"

import {getImageDimensions, isCloudinaryImage} from "../src/cloudinary"

const mockFetch = vi.fn()

mockFetch.mockResolvedValue({
    json: async () => {
        const response = {output: {width: 100, height: 100}}
        return response
    },
})

global.fetch = mockFetch

test("identifies http cloudinary images", () => {
    const result = isCloudinaryImage("http://res.cloudinary.com/photo.jpg")
    expect(result).toEqual(true)
})

test("identifies https cloudinary images", () => {
    const result = isCloudinaryImage("https://res.cloudinary.com/photo.jpg")
    expect(result).toEqual(true)
})

test("identifies other images", () => {
    const result = isCloudinaryImage("https://example.com/photo.jpg")
    expect(result).toEqual(false)
})

test("gets image dimensions", async () => {
    const dimensions = await getImageDimensions(
        "https://res.cloudinary.com/bradgarropy/image/upload/f_auto,q_auto/bradgarropy.com/photo.jpg",
    )

    expect(dimensions).toEqual({width: 100, height: 100})
})
