import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import "./Modal.scss";

type ModalProps = {
  id: string,
  title: string,
  children?: React.ReactNode,
}

export default function Modal({ id, title,  children }: ModalProps) {
  const [ modalShow, setModalShow ] = useState(true);
  const hideModal = (e: React.MouseEvent) => {
    if ((e.target as Element).classList.contains('modal') || (e.target as Element).closest('div')?.classList.contains('hide-modal')) {
      const modal = document.querySelector(`#modal-${id}`);
      modal?.classList.add('hide-modal');
      setTimeout(() => {
        setModalShow(false);
        modal?.classList.remove('hide-modal');
      }, 300);
    }
  }
  return (
    <div className={modalShow ? 'modal show' : 'modal'} id={`modal-${id}`} onClick={hideModal}>
      <div className="modal-dialog p-2 br-2">
        <div className="modal-content">
          <div className="modal-header d-f justify-space-between align-items-center">
            <div className="modal-title">
              <h2 className="font-md m-0">
                {title}
              </h2>
            </div>
            <div className="hide-modal">
              <FaXmark size={20}/>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
