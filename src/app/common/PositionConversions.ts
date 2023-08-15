
export default function convertPositionToNumber(file: string, rank: string): Array<number> {

    const convertedFile: number = file.charCodeAt(0) - 96
    const convertedRank: number = parseInt(rank)

    return [convertedFile, convertedRank]
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
    const [file, rank] = convertPositionToNumber(position[0], position[1])

    if ((file + rank) % 2 === 0) {
        return "SaddleBrown"
    }
    return "BlanchedAlmond"
}