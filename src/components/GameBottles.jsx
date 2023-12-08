import "./styles.css"
import { useState, useEffect } from "react";


function GameBottles() {
  const [bottles, setBottles] = useState(["pink", "blue", "red", "white", "green", "black"])
  const [bottlesHidden, setBottlesHidden] = useState(["pink", "blue", "red", "white", "green", "black"])
  const [selected, setSelected] = useState([])
  const [successes, setSuccesses] = useState();
  const [show, setShow] = useState(false)


  useEffect(() => {
    setSelected([])
    shufflebottles(bottles);
    shufflebottlesHidden(bottlesHidden);
    setSuccesses(0)
  }, [])

  useEffect(() => {
  }, [bottles])

  useEffect(() => {
  }, [successes])

  const compareBottles = (bottles, bottlesHidden) => {
    let varSuccesses = 0;
    bottles.map((bottle, index) => {
      if (bottle === bottlesHidden[index]) {
        varSuccesses = varSuccesses + 1;
      }

    })
    setSuccesses(varSuccesses)
  }

  const shufflebottles = (bottles) => {
    let toShuffle = bottles;
    for (let i = toShuffle.length - 1; i > 0; i--) {
      // Generar un índice aleatorio entre 0 y i
      const j = Math.floor(Math.random() * (i + 1));
      // Intercambiar los elementos en las posiciones i y j
      [toShuffle[i], toShuffle[j]] = [toShuffle[j], toShuffle[i]];
    }
    setBottles([...toShuffle]);
  }

  const shufflebottlesHidden = (bottles) => {
    let toShuffle = bottles;
    for (let i = toShuffle.length - 1; i > 0; i--) {
      // Generar un índice aleatorio entre 0 y i
      const j = Math.floor(Math.random() * (i + 1));
      // Intercambiar los elementos en las posiciones i y j
      [toShuffle[i], toShuffle[j]] = [toShuffle[j], toShuffle[i]];
    }
    setBottlesHidden([...toShuffle]);
  }

  const switchBottles = (color) => {
    selected.push(color);
    setSelected(selected)
    if (selected.length === 2) {
      let temp = bottles[selected[0]];
      bottles[selected[0]] = bottles[selected[1]];
      bottles[selected[1]] = temp
      setBottles([...bottles])
      setSelected([])
    }
  }

  return (
    <div>
      <h1>El Juego de la botella</h1>
      <div className="container">
        <div className="bottles">
          {
            bottles.map((bottle, index) => {
              return (
                <button key={"view" + bottle} className={"bottle " + bottle}
                  onClick={() => switchBottles(index)} />
              );
            })
          }
        </div>

        <div className={`bottles ${show ? "" : "hidden"}`}>
          {
            bottlesHidden.map((bottle) => {
              return (
                <button key={"hide" + bottle} className={"bottle " + bottle} />
              );
            })
          }
        </div>
        <h2>Aciertos: {successes}</h2>
        <button onClick={() => setShow(!show)}>Mostrar</button>
        <button onClick={() => compareBottles(bottles, bottlesHidden)}>Comparar</button>
      </div>
    </div >
  );
}

export default GameBottles;