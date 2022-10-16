type Dimensions = {
    width: number
    height: number
}

const getImageDimensions = async (imageUrl: string): Promise<Dimensions> => {
    const url = new URL(imageUrl)

    const pathSegments = url.pathname.split("/")
    const index = pathSegments.findIndex(value => value === "bradgarropy.com")
    pathSegments.splice(index, 0, "fl_getinfo")
    url.pathname = pathSegments.join("/")

    const response = await fetch(url)
    const json = await response.json()

    const dimensions: Dimensions = {
        width: json.output.width,
        height: json.output.height,
    }

    return dimensions
}

const isCloudinaryImage = (url: string) => {
    if (url.startsWith("http://res.cloudinary.com")) {
        return true
    }

    if (url.startsWith("https://res.cloudinary.com")) {
        return true
    }

    return false
}

export {getImageDimensions, isCloudinaryImage}
export type {Dimensions}
