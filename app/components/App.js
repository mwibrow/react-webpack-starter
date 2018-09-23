import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-regular-svg-icons'
import React from 'react'
import { withRouter } from 'react-router-dom'

class App extends React.Component {
  render () {
    return <section className='hero is-primary'>
      <div className='hero-body'>
        <div className='container'>
          <h1 className='title'>
            It works!
          </h1>
          <h2 className='subtitle'>
            Edit the files to see hot reloading <FontAwesomeIcon icon={faSmile} />
          </h2>
        </div>
      </div>
    </section>
  }
}

export default withRouter(App)
