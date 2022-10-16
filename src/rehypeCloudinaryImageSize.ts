import {Properties} from "hast"
import {Element, isElement} from "hast-util-is-element"
import {CONTINUE, Node, SKIP, visit} from "unist-util-visit"

import {getImageDimensions, isCloudinaryImage} from "./cloudinary.js"

interface Image extends Element {
    properties: Properties
}

const rehypeCloudinaryImageSize = () => {
    const images: Image[] = []

    const visitor = (node: Element) => {
        if (
            isElement(node, "img") &&
            node.properties !== undefined &&
            typeof node.properties.src === "string" &&
            isCloudinaryImage(node.properties.src)
        ) {
            images.push(node as Image)
            return SKIP
        }

        return CONTINUE
    }

    const transformer = async (tree: Node) => {
        visit(tree, "element", visitor)

        const promises = images.map(image => {
            return getImageDimensions(image.properties?.src as string)
        })

        const dimensions = await Promise.all(promises)

        images.forEach((image, index) => {
            const dimension = dimensions[index]

            image.properties.width = dimension.width
            image.properties.height = dimension.height
        })
    }

    return transformer
}

export {rehypeCloudinaryImageSize}
