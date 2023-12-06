import { ChangeEvent, useEffect, useState } from 'react';
import secondCss from './second.module.css';

const Second = () => {
  // Count State
  const [count, setCount] = useState(0);

  // Input State
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    console.log('First Render');
    checkIfFirstTime();
  }, []);


  const checkIfFirstTime = () => {
    const data = localStorage.getItem('firstTimeCount');
    if (!data) {
      setCount(100);
      localStorage.setItem('firstTimeCount', 'true');
    }
  };

  const increaseCountButton = () => {
    console.log('CHANGING COUNT');
    setCount((prevCount) => prevCount + 1);
  };
  
  const onChnageInputVal = (e:ChangeEvent<HTMLInputElement>) => {
    console.log('INPU CHANGE');

    setInputVal(e.target.value);

    document.title = (e.target.value) ? e.target.value : 'MD 13';
  }

  console.log('Render');

  return (
    <div className={secondCss.second_body}>
      <div>
        <button className='button-style_one' onClick={increaseCountButton}>+</button>
        <p style={{fontSize:12+count}}>Count: {count}</p>
      </div>

      <input type="text" className='input_box' onChange={onChnageInputVal} value={inputVal}/>
      <p>{inputVal}</p>
    </div>
  );
};

export default Second;
