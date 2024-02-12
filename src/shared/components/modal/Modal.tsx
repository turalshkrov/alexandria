import "./Modal.scss";

type ModalProps = {
  id: string,
  children?: React.ReactNode,
}

export default function Modal({ id, children }: ModalProps) {
  return (
    <div className="modal" id={id}>
      <div className="modal-dialog">
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  )
}
