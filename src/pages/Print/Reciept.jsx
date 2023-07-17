import React, { useRef } from 'react'
import  { useReactToPrint } from 'react-to-print';
import ReceiptMain from './components/ReceiptMain';
import CurrentUser from '../../components/CurrentUser';




function Reciept() {
  /* print stuff */
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div>
        <button onClick={handlePrint}>Print this out!</button>
        {/* <div style={{ display: "none" }}> */}
        <div>
          <ReceiptMain ref={componentRef} />
        </div>
      </div>
    </div>
  )
}

export default Reciept