import logo from './logo.svg';
import './App.css';
import {useEffect, useLayoutEffect, useState} from "react";
import {HelpList} from "./HelpList";
import {getCommonIndexByNodeAndIndex, getLastNodeAndIndex, getNodeAndIndexByCommonIndex} from "./utils/indexedNodes";
import {patternReplacer} from "./utils/patternReplasce";
import {getTimeStr} from "./utils/getTimeStr";



function App() {
  /** The main data of editor */
  const [value, onChange] = useState([''])
  /** The information of last cursor position (global index in the editor) */
  const [select, setSelect] = useState(null)
  /** The active element in the editor */
  const [active, setActive] = useState(null)


  useLayoutEffect(() => {
    /** Need for update cursor position*/
    const editor = document.querySelector('.editor') // todo need use ref
    const sel = window.getSelection();

    if (sel !== null) {
      if (select) {
        /** Set selection by selection index in state */
        const [target, index] = getNodeAndIndexByCommonIndex(editor, select)
        const range = document.createRange();
        range.setStart(target, index);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      } else {
        /** Set selection in the end of the editor when there isn't selection information */
        const [target, index] = getLastNodeAndIndex(editor)
        if (target) {
          const range = document.createRange();
          range.setStart(target, index);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    }
  })

  useEffect(() => {
    /** Find active element */
    const editor = document.querySelector('.editor')
    const [target, index] = getNodeAndIndexByCommonIndex(editor, select)
    target?.parentElement?.classList.add('active')
    if (target?.parentElement && target) setActive(target?.parentElement)
  }, [select, setActive]) // todo need update this algorithm. Need use other way to set active element

  /** Coordinates by active element */
  const activePosition = active && active.classList.contains('project') && active.offsetLeft ? [active.offsetLeft, active.offsetTop + active.offsetHeight] : null

  /** Change project from helper dropdown */
  const changeProject = (value) => {
    const oldValue = active.innerText
    const line = active.parentElement.innerText
    let position

    onChange(pre => pre.map((i, index, array) => i === line ? i.replace(oldValue, (...props) => {
      position = array.slice(0, index).join('').length + props[1] + value.length // calculate cursor position after replace project name
      return value
    }) : i))

    setSelect(position)
    setActive(null)
  }



  return (
    <div className="App">
      <div className='wrapper'>
        <div contentEditable="true"
             className='editor'
             onInput={(e) => {

               /** Find cursor position with content changes */
               const selection = window.getSelection();
               const range = selection.getRangeAt(0)
               const index = getCommonIndexByNodeAndIndex(e.target, range.endContainer, range.endOffset)

               /**
                * New value as array of line string
                * @type {*|string[]}
                */
               const newValue = e.target.innerText.split('\n')
                 .filter((i, index, arr) => i !== '' || index === arr.length - 1) || ['']

               if (e.nativeEvent.inputType === 'insertParagraph' && !index && newValue[newValue.length - 1] === '') {
                 /** The case with new line in the end of content */
                 newValue[newValue.length - 1] = getTimeStr()
                 onChange(newValue)
                 setSelect(newValue.join('').length)
               } else {
                 /** Default case */
                 setSelect(index)
                 onChange(newValue)
               }
             }}

             key={value.join('_') + Date.now()} // todo research it. Need update content after all changes.
             dangerouslySetInnerHTML={{
               __html:
                 value.map(i => `<div class="line">${patternReplacer(i)}</div>`).join('')
             }}
        />
        <HelpList positions={activePosition} onChange={changeProject}/>
      </div>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
