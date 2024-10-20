import { useDispatch, useSelector } from "react-redux"
import { CardPreview } from "../components/CardPreview/CardPreview"
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { deleteCard, editCard } from "../redux/cardSlice";
import { Navigation } from "../components/Navigation/Navigation";
import styles from "./Style.module.css"

export function CardDetail(){
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log(params);
    
    const cards = useSelector((store)=>store.cardReducer.cards)
    const selectedcard = cards.find(card => card.id === Number(params.id))
    console.log("Selected card:", selectedcard);
    
    const [editCardNumber, setEditCardNumber] = useState(selectedcard?.cardNumber || '')
    const [editCardHolder, setEditCardHolder] = useState(selectedcard?.cardHolder || '')
    const [editValidThru, setEditValidThru] = useState(selectedcard?.validThru || '')
    const [editCcv, setEditCcv] = useState(selectedcard?.ccv || '')
    const [editVendor, setEditVendor] = useState(selectedcard?.vendor || '')
    const [editIsActivited, setIsActivited] = useState(selectedcard?.isActivited || false)
    const [message, setMessage] = useState("")


    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear(); //获取当前的年份
        let month = String(today.getMonth() + 1);
        //确保月份总是由两位数字组成。例如，'9' 变成 '09
        if (month < 10) {
            month = '0' + month;
          }
        return `${year}-${month}`;
    };

    let handleDeleteCard = () => {
        dispatch(deleteCard({id: selectedcard.id}))
        navigate('/')
    }

    let handleActivateCard = () => {
        dispatch(editCard({id: selectedcard.id,
            newCardNumber: editCardNumber, 
            newCardHolder: editCardHolder, 
            newValidThru: editValidThru, 
            newCcv: editCcv, 
            newVendor:editVendor,
            updateActiviteState:!editIsActivited
        }))
        navigate('/')
    }

    let handleSubmitEdit = ()=> {
            if(editCardNumber.length !== 16) {
                setMessage("Card number has to be 16 digits.")
            } else {
                dispatch(editCard({id:selectedcard.id,
                    newCardNumber: editCardNumber, 
                    newCardHolder: editCardHolder, 
                    newValidThru: editValidThru, 
                    newCcv: editCcv, 
                    newVendor:editVendor,
                    updateActiviteState:editIsActivited})
                    );
                    navigate('/')
            }
            }
      
    
    return(
        <>
            <h2>Card detail</h2>
            <Navigation/>
            {selectedcard ? (
                <>
                    <div>
                    <button className={styles.activate_btn} onClick={handleActivateCard}>Activate card</button>
                    <button className={styles.delete_btn} onClick={handleDeleteCard}>Delete card</button>
                    <CardPreview cardNumber={editCardNumber}
                            cardHolder={editCardHolder}
                            validThru={editValidThru}
                            vendor={editVendor}
                            ccv={editCcv}/>
                    </div>

                    <div className={styles.newCard_container}>
                        <div>
                            <label htmlFor="card-number">Card number: </label>
                            <input 
                                type="number" 
                                name="cardNumber" 
                                min={0}
                                value={editCardNumber} 
                                onChange={e => {setMessage(''); setEditCardNumber(e.target.value)}}
                            />
                        </div>
                        <div>
                        <label htmlFor="card-holder">Card holder name: </label>
                        <input 
                            type="text" 
                            name="cardHolder" 
                            placeholder="Princess"
                            value={editCardHolder} 
                            onChange={e => {setMessage(''); 
                                            if(/^[a-zA-Z\s]*$/.test(e.target.value))
                                                {setEditCardHolder(e.target.value)}
                                            }}
                        />
                        </div>
                        <div>   
                            <label htmlFor="valid-thru">Valid Thru: </label>
                            <input 
                                type="month" 
                                name="validThru" 
                                value={editValidThru} 
                                min={getTodayDate()}
                                onChange={e => {setMessage(''); setEditValidThru(e.target.value)}} 
                            />
                        </div>
                        <div>
                            <label htmlFor="ccv">CCV: </label>
                            <input 
                                type="number" 
                                name="ccv" 
                                value={editCcv} 
                                onChange={e => {setMessage(''); 
                                                if(e.target.value.length <= 3){
                                                    setEditCcv(e.target.value)}
                                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="vendor">Vendor: </label>
                            <select
                            name="vendor"
                            value={editVendor} 
                            onChange={e => {setMessage(''); setEditVendor(e.target.value)}}
                            >
                                <option value="ICBC">ICBC</option>
                                <option value="CCB">CCB</option>
                                <option value="ABC">ABC</option>
                            </select>
                        </div>
                    <p className={styles.newCard_message}>{message}</p>
                    <button onClick={handleSubmitEdit}>Save changes</button>
                    </div>
                </>
            ) : (
                <p>You have no card, apply one now!</p>
            )}
        </>
    )
}
