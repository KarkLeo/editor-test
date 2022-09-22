import React, {useEffect, useRef, useState} from 'react'


// ===== List =====

const projects = [
  'test',
  'demo',
  'project'
] // todo replace to real data


export const HelpList = ({positions, onChange}) => {

  /** Active item in list */
  const [active, setActive] = useState(null)

  const list  = useRef(null) // todo need research it. It can be redundant.

  useEffect(() => {
    /** Create event handler for work dropdown */
    if(positions && list.current) {
      list.current.focus()
      const presskey = (e) => {
        if(e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Enter') {
          e.preventDefault()

          if(e.key === 'ArrowUp') {
            setActive(pre => {
              if(pre === null) return projects[projects.length - 1]
              const current = projects.indexOf(pre)
              if(current === 0) return projects[projects.length - 1]
              else return projects[current - 1]
            })
          }

          if(e.key === 'ArrowDown') {
            setActive(pre => {
              if(pre === null) return projects[0]
              const current = projects.indexOf(pre)
              if(current === projects.length - 1) return projects[0]
              else return projects[current + 1]
            })
          }

          if(e.key === 'Enter' && onChange && active) {
            onChange(active)
            setActive(null)
          }
        }
      }

      document.addEventListener('keydown', presskey)
      return () => {
        document.removeEventListener('keydown', presskey)
      }
    }
  }, [positions, setActive, onChange, active])

  return positions ? <ul
    ref={list}
    className='list'
    style={{
      '--x': positions[0],
      '--y': positions[1]
    }}
    role="listbox"
  >
    {projects.map(i => <li key={i} role="option" className={active === i ? 'current' : ''}>{i}</li>)}
    {/*// todo add filter by current value in the project*/}
    {/*// todo add mouse click event  */}
  </ul> : null
}