
export default function convertPositionToNumber(position: string): Array<number> {

    const convertedFile: number = position[0].charCodeAt(0) - 96
    const convertedRank: number = parseInt(position[1])

    return [convertedFile, convertedRank]
}

export function convertPositionToString(file: number, rank: number): string {

    const convertedFile: string = String.fromCharCode(96 + file)
    const convertedRank: string = rank.toString()

    return convertedFile + convertedRank
}

// Function to return the colour of the square given its position string
export function colourFromPosition(position: string): string {
    const positionRegex = "^[a-h][1-8]$"
    // Split position string into rank and file
    if (position.length !== 2) {
        throw "Position string must be of length 2"
    } else if (!position.match(positionRegex)) {
        throw "Position string must be a valid chess position"
    }

    // Get the value of the alphabetic file as a number, e.g. a is 1, b is 2, by
    // getting its unicode value and subtracting 96, since the unicode value of
    // a is 97
    const [file, rank] = convertPositionToNumber(position)

    if ((file + rank) % 2 === 0) {
        return "SaddleBrown"
    }
    return "BlanchedAlmond"
}