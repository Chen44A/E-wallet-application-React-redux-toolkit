import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { CardPreview } from "../components/CardPreview/CardPreview"
import { Navigation } from "../components/Navigation/Navigation";
import styles from "./Style.module.css"

export function Home(){
    const cards = useSelector((store)=>store.cardReducer.cards)
    const navigate = useNavigate();
    
    return(
        <>
         <Navigation/>
         <div className={styles.container}>
            <div className={styles.textContent}>
                <h2>Manage Your Money with Ease: <br /> Empower Your Wallet Today!</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi minima dolor impedit cupiditate illum nam suscipit deleniti corporis facilis quam odio eum, nisi reprehenderit dignissimos officia necessitatibus aspernatur accusamus explicabo.</p>
                <Link to="/addcard"><button>Add new Card</button></Link>
            </div>
        </div>

         <h2>Active cards</h2>
        {cards.filter(card=>card.isActivited === true).map((card,i)=>
             <div className={styles.divContainer} key={i}>
                <CardPreview 
                        cardNumber={card.cardNumber}
                        cardHolder={card.cardHolder}
                        validThru={card.validThru}
                        vendor={card.vendor}
                        ccv={card.ccv}/>
            </div>
        )}
       <h2>Inactive cards</h2>
        {cards.filter(card=>card.isActivited === false).length > 0 ? (
            cards.filter(card=>card.isActivited === false).map((card,i)=>
                <div className={styles.divContainer_inactive} key={i} onClick={()=>navigate(`/carddetail/${card.id}`)}>
                    
                   <CardPreview  
                           cardNumber={card.cardNumber}
                           cardHolder={card.cardHolder}
                           validThru={card.validThru}
                           vendor={card.vendor}
                           ccv={card.ccv}/>
               </div>
        )):(
            <p className={styles.inactive_message}>You don't have any inactivity cards yet!</p>
        )}
        </>
    )
}