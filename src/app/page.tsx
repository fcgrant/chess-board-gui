import Square from './components/Square'

export default function Home() {

  const squareProps = {
    piece: lightKnight,
    color: true
  }

  return (
    <>
      {lightKnight}
      <Square
        piece={squareProps.piece}
        color={squareProps.color}
      />
    </>
  )
}
