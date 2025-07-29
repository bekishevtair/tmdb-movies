import { memo, useEffect, type ReactNode } from "react";
import { closeModal } from "../store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";

interface ModalProps {
  children: ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const modalStatus = useSelector((store: RootState) => store.modal.isOpened);

  useEffect(() => {
    const handleKeyEvent = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dispatch(closeModal());
      }
    };
    if (modalStatus) {
      window.addEventListener("keydown", handleKeyEvent);
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      window.removeEventListener("keydown", handleKeyEvent);
      document.body.classList.remove("overflow-hidden");
    };
  }, [modalStatus]);

  return (
    <div
      onClick={() => dispatch(closeModal())}
      className={`${modalStatus ? "flex" : "hidden"} modal`}
    >
      <div onClick={(e) => e.stopPropagation()} className="modal_card">
        <div className="modal_row">
          <button onClick={() => dispatch(closeModal())} className="btn_close">
            Close X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default memo(Modal);
