import { useState } from 'react';
import styles from './App.module.css'
import poweredImg from './assets/powered.png'
import leftArrowImg from './assets/leftarrow.png'
import { GridItem } from './components/GridItem'

import {levels, calcImc, Level} from './helpers/imc'

const App = () => {
    const [heightField, setHeightField] = useState<number>(0);
    const [weightField, setWeightField] = useState<number>(0);
    const [showItem, setShowItem] = useState<Level | null >(null);

    const handleCalcButton = () => {
        if(heightField && weightField) {
            setShowItem(calcImc(heightField, weightField));
        } else {
            alert('Digite todos os campos!')
        }
    }

    const handleBackButton = () => {
        setShowItem(null);
        setHeightField(0);
        setWeightField(0);
    }

  return (
    <div className={styles.main}>
        <header>
            <div className={styles.headerContainer}>
                <small>Powered By <strong> <a href="https://almeidadeveloper.com" className={styles.link}> Almeida Dev </a></strong></small>
            </div>
        </header>
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <h1>Calcule o seu IMC</h1>
                <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde 
                    para calcular o peso ideal de cada pessoa.
                </p>

                <input 
                    type="number"
                    placeholder="Digite a sua altura. Ex.: 1.5 (em metros)"
                    value={heightField > 0 ? heightField : ''}
                    onChange={e => setHeightField(parseFloat(e.target.value))}
                    disabled={showItem ? true : false}
                />
                <input 
                    type="number"
                    placeholder="Digite o seu peso. Ex.: 75.3 (em kg)"
                    value={weightField > 0 ? weightField : ''}
                    onChange={e => setWeightField(parseFloat(e.target.value))}
                    disabled={showItem ? true : false}
                />

                <button onClick={handleCalcButton} disabled={showItem ? true : false}>Calcular</button>
            </div>
            <div className={styles.rightSide}>
                {!showItem &&
                    <div className={styles.grid}>
                        {levels.map((item, key) => (
                            <GridItem key={key} item={item} />
                        ))}
                    </div>
                }
                { showItem && 
                    <div className={styles.rightBig}>
                        <div className={styles.rightArrow} onClick={handleBackButton}>
                            <img src={leftArrowImg} alt="" width={25} />
                        </div>
                        <GridItem item={showItem} />
                    </div>
                }
            </div>
        </div>
    </div>
  );
}

export default App;
