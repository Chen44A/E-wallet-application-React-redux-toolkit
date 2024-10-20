import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { CardPreview } from "../components/CardPreview/CardPreview";
import { useNavigate } from "react-router-dom";
import { addCard } from "../redux/cardSlice";
import { Navigation } from "../components/Navigation/Navigation";
import styles from "./Style.module.css"

export function AddCard() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const card = useSelector((store) => store.cardReducer.cards);
    const [message,setMessage]=useState('')


    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear(); //get current year
        let month = String(today.getMonth() + 1);
        //make sure all of the month is the form of two digit "01"
        if (month < 10) {
            month = '0' + month;
          }
        return `${year}-${month}`;
    };

    const generateRandomCardNumber = () => {
        let cardNumber = '';
        for (let i = 0; i < 16; i++) {
          cardNumber += Math.floor(Math.random() * 10); //Math.floor() 向下取整，
        }
        return cardNumber;
      };
    
    const [newCard, setNewCard] = useState({
        id: Date.now(),
        cardNumber: '',
        cardHolder: '',
        validThru: '',
        ccv: '',
        vendor: 'ICBC',
        isActivited: false
    });
    
    useEffect(() => {
        const randomCardNumber = generateRandomCardNumber();
        setNewCard((prevCard) => ({
            ...prevCard,
            cardNumber: randomCardNumber
        }));
    }, []);

    const handleSave = () => {
        if (card.length < 4) {
            //make sure the information of new card is fullfilled
            if(newCard.cardNumber.length !== 16) {
                setMessage("Card number has to be 16 digits.")
            } else if (newCard.ccv.length > 3) {
                setMessage("CCV has to be 3 digits.")
            } else if(newCard.cardHolder && newCard.validThru ) {
                dispatch(addCard(newCard)); // Dispatch the new card to Redux store
                navigate("/");
            } else {
                setMessage ("Please fill all of the information!")
            }
        } else {
            setMessage('You can just put max 4 cards!')
        }
            

        
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMessage('')
        if (name === "cardHolder") {
            // 使用正则表达式，只允许字母和空格
            if (/^[a-zA-Z\s]*$/.test(value)) {
                setNewCard((prevCard) => ({
                    ...prevCard,
                    [name]: value, // 更新 cardHolder 值
                }));
            }
        } else {
            // 对其他字段不做限制，直接更新
            setNewCard((prevCard) => ({
                ...prevCard,
                [name]: value,
            }));
        }
    };

    return (
        <>
            <Navigation/>
            <CardPreview 
                cardNumber={newCard.cardNumber}
                cardHolder={newCard.cardHolder}
                validThru={newCard.validThru}
                vendor={newCard.vendor}
                ccv={newCard.ccv}
            />
            <div>
            <h2>New Card</h2>
                <div className={styles.newCard_container}>
                    <div>
                        <label htmlFor="card-number">Card number: </label>
                        <input
                        type="number"
                        name="cardNumber"
                        min={0}
                        value={newCard.cardNumber}
                        onChange={handleInputChange}
                    />
                    </div>
                
                    <div>
                        <label htmlFor="card-holder">Card holder name: </label>
                            <input
                            type="text"
                            name="cardHolder"
                            placeholder="Bamse"
                            value={newCard.cardHolder}
                            onChange={handleInputChange}
                            />
                    </div>
                  
                    <div>
                        <label htmlFor="valid-thru">Valid Thru: </label>
                        <input
                        type="month"
                        name="validThru"
                        value={newCard.validThru}
                        onChange={handleInputChange}
                        min={getTodayDate()}
                        />
                    </div>
                   
                    <div>
                        <label htmlFor="ccv">CCV: </label>
                        <input
                        type="number"
                        name="ccv"
                        placeholder="123"
                        min={0}
                        value={newCard.ccv}
                        onChange={handleInputChange}
                        />
                    </div>
                 
                    <div>
                        <label htmlFor="vendor">Vendor: </label>
                        <select
                        name="vendor"
                        value={newCard.vendor}
                        onChange={handleInputChange}
                        >
                            <option value="ICBC">ICBC</option>
                            <option value="CCB">CCB</option>
                            <option value="ABC">ABC</option>
                        </select>
                    </div>
                    <p className={styles.newCard_message}>{message}</p>
                    <button onClick={handleSave}>Save</button>
                </div>
            </div>

        </>
    );
}
