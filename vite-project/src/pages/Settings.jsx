import { useDispatch, useSelector } from "react-redux";
import { Navigation } from "../components/Navigation/Navigation";
import { useEffect, useState } from "react";
import { setTheme } from "../redux/themeSlice";
import { deleteAllInactiveCards } from "../redux/cardSlice";
import { useNavigate } from "react-router-dom";
import styles from "./Style.module.css"

export function Settings(){ 
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const selectedMode = useSelector((store)=>store.themeReducer.theme);

    const [theme, settheme]= useState(selectedMode || "lightMode");

    useEffect(()=> {
        if(selectedMode === "darkMode") {
            document.body.style.background = '#2C2C2C'
            document.body.style.color = 'white'
        } else if(selectedMode === "lightMode") {
            document.body.style.background = 'white'
            document.body.style.color = 'black'
        } else if(selectedMode === "ocean") {
            document.body.style.background = 'linear-gradient(45deg, #6C8B95, #A08365)'
            document.body.style.color = 'black'
        }
    },[selectedMode])

    let handleDeleteAllInactiveCards = () => {
        dispatch(deleteAllInactiveCards());
        navigate("/")
    }
    
    return(
        <>
        <Navigation/>
        <h2>Theme</h2>
        <div className={styles.theme_container} >
            <div>
                <label htmlFor="theme">Theme: </label>
                <select 
                    name="theme" 
                    value={theme}
                    onChange={e => settheme(e.target.value)}
                >
                    <option value="lightMode">Light mode</option>
                    <option value="darkMode">Dark mode</option>
                    <option value="ocean">Ocean</option>
                </select>
                <button className={styles.save_btn} onClick={()=>dispatch(setTheme(theme))}>Save</button>
            </div>
            
            <button className={styles.delete_btn} onClick={handleDeleteAllInactiveCards}>Delete all inactive cards</button>
        </div>
        </>
    )
}