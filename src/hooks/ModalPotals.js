import ReactDOM from 'react-dom'

const ModalPortals = ({ children }) => {
  const modalElement = document.querySelector('#modal')

  return ReactDOM.createPortal(children, modalElement)
}

export default ModalPortals
