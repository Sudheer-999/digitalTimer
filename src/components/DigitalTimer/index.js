import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isTimerRunning: false, timerLimit: 25, currentSeconds: 0}

  componentWillUnmount() {
    this.clearTimer()
  }

  onIncrementLimit = () => {
    this.setState(prevState => ({timerLimit: prevState.timerLimit + 1}))
  }

  onDecrementLimit = () => {
    this.setState(prevState => ({timerLimit: prevState.timerLimit - 1}))
  }

  clearTimer = () => {
    clearInterval(this.intervalId)
  }

  onResetTimer = () => {
    this.setState({isTimerRunning: false, timerLimit: 25, currentSeconds: 0})
    this.clearTimer()
  }

  startCountDown = () => {
    const {timerLimit, currentSeconds} = this.state

    const isTimeCompleted = timerLimit * 60 === currentSeconds

    if (isTimeCompleted) {
      this.setState({isTimerRunning: false, currentSeconds: 0})
    } else {
      this.setState(prevState => ({
        currentSeconds: prevState.currentSeconds + 1,
      }))
    }
  }

  startStopTimer = () => {
    const {isTimerRunning, timerLimit, currentSeconds} = this.state
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))

    const isTimeCompleted = timerLimit * 60 === currentSeconds

    if (isTimeCompleted) {
      this.clearTimer()
      this.setState((isTimerRunning: false))
    }
    if (isTimerRunning) {
      this.setState({isTimerRunning: false})
      this.clearTimer()
    } else {
      this.intervalId = setInterval(() => {
        this.startCountDown()
      }, 1000)
    }
  }

  renderTimerControl = () => {
    const {isTimerRunning} = this.state

    const playPauseIcon = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const altText = isTimerRunning ? 'pause icon' : 'play icon'

    const displayText = isTimerRunning ? 'Pause' : 'Start'

    const resetIcon =
      'https://assets.ccbp.in/frontend/react-js/reset-icon-img.png'
    const resetText = 'reset icon'

    return (
      <div className="controls-container">
        <button
          type="button"
          className="start-stop-btn"
          onClick={this.startStopTimer}
        >
          <div className="start-stop-con">
            <img
              src={playPauseIcon}
              alt={altText}
              className="play-pause-icon"
            />
            <h1 className="display-text">{displayText}</h1>
          </div>
        </button>
        <button type="button" className="reset-btn" onClick={this.onResetTimer}>
          <div className="reset-con">
            <img src={resetIcon} alt={resetText} className="reset-icon" />
            <h1 className="reset-text">Reset</h1>
          </div>
        </button>
      </div>
    )
  }

  renderSetTimeLimit = () => {
    const {timerLimit, currentSeconds} = this.state

    const isDisabled = currentSeconds > 0

    return (
      <div className="set-timer-con">
        <p className="limit-text">Set Timer limit</p>
        <div className="inc-dec-con">
          <button
            type="button"
            className="dec-btn"
            onClick={this.onDecrementLimit}
            disabled={isDisabled}
          >
            -
          </button>
          <div className="limit-display">
            <p className="timer-limit">{timerLimit}</p>
          </div>
          <button
            type="button"
            className="inc-btn"
            onClick={this.onIncrementLimit}
            disabled={isDisabled}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  timerFormat = () => {
    const {timerLimit, currentSeconds} = this.state
    const timeInSeconds = timerLimit * 60 - currentSeconds

    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)

    const minutesInString = minutes > 9 ? minutes : `0${minutes}`
    const secondsInString = seconds > 9 ? seconds : `0${seconds}`

    return `${minutesInString}:${secondsInString}`
  }

  render() {
    const {isTimerRunning} = this.state

    const timerStatus = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="bg-container">
        <div className="timer-con">
          <h1 className="main-head">Digital Timer</h1>
          <div className="control-items-container">
            <div className="timer-displaying-con">
              <div className="clock-con">
                <h1 className="time-text">{this.timerFormat()}</h1>
                <p className="clock-status">{timerStatus}</p>
              </div>
            </div>
            <div className="timer-controlling-container">
              {this.renderTimerControl()}
              {this.renderSetTimeLimit()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
