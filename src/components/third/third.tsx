import { ReactElement, createElement, useRef, useState } from 'react';
import thirdCss from './third.module.css';


const Third = () => {

  // Color Ref
  const colorRectRef = useRef<HTMLDivElement | null>(null);

  // Div Clone Ref & clonedArr State
  const cloneRectRef = useRef<HTMLDivElement | null>(null);
  const [clonedDivArr, setClonedDivArr] = useState<ReactElement[]>([]);

  // Div Move To Corner Ref & inner Div Text State
  const divMoveToCornerRef = useRef<HTMLDivElement | null>(null);
  const [divMoveText, setDivMoveText] = useState('');

  const colorOnClickButton = () => {
    colorRectRef.current?.classList.add(thirdCss.changed_color)
  };

  const cloneDivOnClickButton = () => {
    
    if (cloneRectRef.current !== null) {
      const clone = createElement('div', { ...cloneRectRef.current.attributes, className: cloneRectRef.current.className, key: Math.random()})
      if (clone) setClonedDivArr((prevClones) => [...prevClones, clone]);
    }
  };

  const divMoveToCornerButtonCick = () => {
    divMoveToCornerRef.current?.parentElement?.classList.add(thirdCss.move_div_wrapper_reverse);
    setDivMoveText('Esmu Stūrī')
  };

  return (
    <div className={thirdCss.third_body}>
      <div className={thirdCss.color_wrapper}>
        <div className={thirdCss.div_rect} ref={colorRectRef}></div>
        <button 
          className='button-style_one'
          onClick={colorOnClickButton}
        >Change Color</button>
      </div>

      <div className={thirdCss.clone_div_wrapper}>
        <div className={thirdCss.div_rect} ref={cloneRectRef}></div>
        {
          clonedDivArr.map((clone) => clone)
        }
      </div>

      <button           
          className='button-style_one'
          style={{width:'fit-content'}}
          onClick={cloneDivOnClickButton}
          >Clone Div
      </button>

      <div className={thirdCss.move_div_wrapper}>
        <div className={thirdCss.move_div_rect} ref={divMoveToCornerRef}>{divMoveText}</div>
      </div>

      <button           
        className='button-style_one'
        style={{width:'fit-content'}}
        onClick={divMoveToCornerButtonCick}
        >Send div to corner
      </button>
    </div>
  );
};

export default Third;
