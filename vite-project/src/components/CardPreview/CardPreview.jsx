import styles from "./CardPreview.module.css";
import sensorImge from '../../assets/sensor.png'
import masterCardLogo from '../../assets/Mastercard_logo.png'

// 格式化卡号，每4位插入一个空格
const formatCardNumber = (cardNumber) => {
  let formattedNumber = '';
  for (let i = 0; i < cardNumber.length; i++) {
    formattedNumber += cardNumber[i];
    // 每四位后加空格，但不在最后一组后面加
    if ((i + 1) % 4 === 0 && i !== cardNumber.length - 1) {
      formattedNumber += ' ';
    }
  }
  return formattedNumber;
};


// getCardStyle 函数返回 CSS 模块中的 class 名称
const getCardStyle = (vendor) => {
  switch (vendor) {
    case 'ABC':
      return styles.card_ABC;
    case 'ICBC':
      return styles.card_ICBC;
    default:
      return styles.card_CCB; // 默认样式
  }
};

export function CardPreview({ cardNumber, cardHolder, validThru, vendor, ccv }) {
  return (
    <div className={styles.card_container}>
      <div className={`${styles.card_preview} ${getCardStyle(vendor)}`}>
        <div className={styles.card_logo}>
          <img className={styles.sensorImge} src={sensorImge} alt="" />
          {vendor} 
        </div>
        <div className={styles.card_number}>
          {formatCardNumber(cardNumber)}
        </div>
        <div className={styles.card_holder}>
          <span>Card Holder</span>
          <span>{cardHolder || 'Bamse'}</span>
        </div>
        <div className={styles.card_expiry}>
          <span>Valid Thru</span>
          <span>{validThru || 'YYYY-MM'}</span>
        </div>
      </div>
      
      <div className={`${styles.card_preview} ${getCardStyle(vendor)}`}>
        <div  className= {styles.card_backSide} >
          <div className= {styles.ccv_container}>
            <p className= {styles.ccv}>CCV: {ccv || '123'} </p>
          </div>
            <img className= {styles.Mastercard_logo} src={masterCardLogo} alt="" />
        </div>  
      </div>
    </div>
  );
}
