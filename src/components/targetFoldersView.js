import Button from "./button/button"
import "./targetFoldersStyle.sass"

const Header = () => {
  return (
    <header>
      <h1>Add target folders!</h1>
      <h2>There is no folder defined to search movies in.</h2>
    </header>
  )
}

const TargetFoldersView = () => {
  return (
    <div className='view target-folders'>
      <main>
        <Header />

        <div className='folders'></div>

        <div className='actions'>
          <Button icon='add' text='Add Folder' color='var(--primary)' />
          <Button
            icon='rightArrow'
            text='Continue'
            color='var(--success)'
            right
          />
        </div>
      </main>
    </div>
  )
}

export default TargetFoldersView
