import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import firstCss from './first.module.css';

const COLORS = ['Red', 'Green', 'Blue', 'Yellow', 'Black', 'White', 'Purple'] as const;

const First = () => {
  
  // Input Reference
  const inputOnFocusRef = useRef<HTMLInputElement | null>(null);
  
  // String State
  const [stringArr, setStringArray] = useState<string[]>([]);
  const [arrString, setArrString] = useState('');
  const [combinedStr, setCombinedStr] = useState('');

  // Count Click State
  const [clickCount, setClickCount] = useState(0);

  // Color Div State
  const [colorArray, setColorArray] = useState<string[]>([]);
  const [currColor, setCurrColor] = useState<string>(COLORS[0]);

  // Timer & Disabled Button State
  const [counter, setCounter] = useState(5);
  const [disabled, setDisabled] = useState(true)


  useEffect(() => {
    counter >= 0 && setTimeout(() => {
      setCounter((prevCount) => {
        const c = prevCount - 1;
        setDisabled(c >= 0 ? true : false);
        return c < 0 ? 0 : c;
      });
    }, 1000);
  }, [counter]);


  useEffect(() => {
    if (inputOnFocusRef.current) inputOnFocusRef.current.focus();
  }, []);

  const updateCount = () => {
    setClickCount((prevClick) => prevClick + 1);
  };

  const onFromSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStringArray([...stringArr, arrString]);
    setArrString('');
  
    setCombinedStr(prevStringArr => prevStringArr + ' ' + arrString);
  };

  const onColorFromSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setColorArray((prevColor) => [...prevColor, currColor.toLowerCase()])
  };

  const setColorOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrColor(e.target.value);
  };

  const checkClickDisable = () => {
    console.log('PRESSING THE BUTTON THAT WAS DISABLED!')
  }

  const changeInputString = (e:ChangeEvent<HTMLInputElement>) => {
    setArrString(e.target.value);
  };

  return (
    <div className={firstCss.first_body}>
      <div>
        <input className='input_box' type="text" placeholder='Write something...' ref={inputOnFocusRef}/>
      
        <form onSubmit={onFromSubmit}>
          <input className='input_box' type="text" placeholder='Write something...' value={arrString} onChange={changeInputString}/>
          <button type='submit' className='button-style_one'>Submit</button>
        </form>
        <p>{combinedStr}</p>
      </div>

      <div>
        <button className='button-style_one' onClick={checkClickDisable} disabled={disabled}>Poga</button>
        <button className='button-style_one' onClick={updateCount}>Count: {clickCount}</button>
        <div className={firstCss.white_rect}>{clickCount*2}</div>
      </div>
      
      <div>
        <form onSubmit={onColorFromSubmit}>
          <button className='button-style_one' type='submit'>+</button>
          <select className={firstCss.selection_box} onChange={setColorOnChange}>
            {
              COLORS.map((color) =>
                <option value={color}
                  key={color}
                >{color}</option>
              )
            }
          </select>
        </form>

        <div className={firstCss.color_container}>
          {
            colorArray.map((color, index) =>
            <div className={firstCss.color_rect}
            key={index}
            style={{backgroundColor:color}}></div>
            )
          }
        </div>
      </div>

    </div>
  );
};

export default First;
