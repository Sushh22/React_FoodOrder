import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({children, open,onClose, className=''}){

    const dialog  = useRef();
    useEffect(()=>{
        const modal = dialog.current
        if(open){
            modal.showModal();
        }
        return ()=> modal.close();
    } , [open]);
    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>{children}</dialog>
    , document.getElementById('modal'));
}

/*I was so confused on how the useEffect function is working here. 
1. Initially when component rendered the useEffect will run after component and will just execute internal operation i.e. 
if statement and not cleanup function.

2. When value of open changes externally and set to true

    -> First execute previous cleanup function
    -> so model close() function executes, but won't have any effect as it is already closed
    -> Then it will execute useEffect internal operation i.e. if statement and as it satisfies condition so it will execute showModal() function and will open the modal.

3. Then after clicking on custom Close button and changing the value of open to false

    -> runs previous cleanup function
    -> so execute close() function and closes the model
    -> Then execute internal operation i.e. if statement so the condition will fail and won't do anything. */