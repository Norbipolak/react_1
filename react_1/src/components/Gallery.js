import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, UseRef, useState } from "react";

function Gallery() {
    const [index, setIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(0);
    const [toIndex, setToIndex] = useState(-1);
    const [direction, setDirection] = useState("");
    const [images, setImages] = useState([
        {
            title: "Kép 1",
            src: require("../images/images1.jpg")
        },
        {
            title: "Kép 2",
            src: require("../images/images2.jpg")
        },
        {
            title: "Kép 3",
            src: require("../images/images3.jpg")
        },
        {
            title: "Kép 4",
            src: require("../images/images4.jpg")
        }
    ]);
    const [disableBtns, setDisableBtns] = useState(false);
    const [titleHided, setTitleHided] = useState(false);
    const nextImage = useRef();
    const currentImg = useRef();

    /*
    Ezek a useState-s változóink vannak, kell egy index, kell egy nextIndex a következő képnek és ezzel fogjuk áltogatni a képeket indexek alapján 
    van egy tömb, amiben benne vannak a képek, van itt egy elérési útvonal, ami nekünk fontos és van egy title, amit majd csak kíírunk 
    kell egy direction, mert ettől fog függeni, hogy a nextImage az +1 vagy -1 lesz 

    A useRef azért kell, hogy hozzá tudjunk férni a a return ahhoz amihez szeretnénk, megadjuk ott useRef={nextImage} vagy a currentImage-t 
    és akkor hozzá tudunk férni ahhoz és tudunk neki a current-vel add-olni meg remove-olni különböző class-okat!!!! 

    titleHided meg a disableBtns az false lesz a kezdőértéke és ha ez true lesz, akkor rá tudunk menni a btn-re meg a title meg fog jeleni 
    ezt majd a függvényekben fogjuk ennek az értékét változtatni
    */

    /*
    A forward függvénnyel megyünk majd előre, ami vár egy nextIndex-et ami alapból -1 lesz, ez majd azért kell, hogy ne csak egyessével 
    tudjunk majd menni, hanem ha rákattintunk valamelyikre, akkor oda ugorjon!!
    */
    const forward = (nextIndex = -1)=> {
        setDisableBtns(true);
        currentImg.current.classList.add("prev-image-foraward");
        nextImage.current.classList.add("current-image-forward");
        nextImage.current.classList.remove("left-100p");
        nextImage.current.classList.remove("right-100p");
        setDirection("forward"); // ez fontos, mert tudnunk kell, hogy honnan merre megyünk és ez alapján kell beállítani az index-eket!!! 
        /*
        itt hozzáadjuk azokat a class-okat, hogy menjen 100%-val jobbra mindengyik a next és a current is az egyik ugye -100%-ról indul a másik meg 
        0-ról, és levesszük a class-okat a nextImage-ről, ami alapból el van tolva, hogy eltudjuk, most tolni majd amikor megtörténik a képcsere
        ami itt a setTimeout-ban van akkor levesszük a class-okat, amik eltolták, majd visszaadjuk a left vagy a right-100p-t, hogy visszaálljon 
        az eredeti helyére!!! 
        */
        setTimeout(()=> {
            if(index < images.length-1) {//ha kisebb, mint az images.length-1, akkor tudunk előre váltani, ha meg nem akkor meg megadjuk neki a 0-t
                if(nextIndex === -1) {
                    setIndex(i=>++i);
                } else {
                    setIndex(nextIndex);
                    //itt meg ha nextIndex az -1 akkor csak egyel növeljük, ha viszont nem, akkor meg netIndex-re ugrunk!! 
                }
            } else {
                setIndex(0);
            }

            //itt meg levesszük a class-okat, ha megtörtént a váltás!!! 
            nextImage.current.classList.add("left-100p");
            nextImage.current.classList.remove("current-image-forward");
            currentImg.current.classList.remove("prev-image-forward");
            setDisableBtns(false);
            setToIndex(-1);
        }, 1000);
    };

    const backward = (nextIndex = -1)=> { //és fontos, hogy itt nem nextIndex === -1 hanem nextIndex = -1 kell, hogy legyen assigment operator 
        nextImage.current.classList.remove("right-100p");
        nextImage.current.classList.remove("left-100p");
        nextImage.current.classList.add("current-image-backward");
        currentImg.current.classList.add("prev-image-backward");
        /*
        fontos, hogy itt másmerre megyünk ezért más class-okat kell majd hozzáadni meg majd levenni is!!! 
        másmerre kell, hogy majd eltolja, mert máshonnan jön majd be a kép!!! 
        */
        setDirection("backward");

        setTimeout(()=> {
            if(index > 0) {
                //itt meg akkor tudunk majd hátrafelé menni ha az index az nagyobb mint 0, ha meg nem akkor berakjuk az images.length-1-diket
                if(nextIndex === -1) {
                    //itt meg megnézzük, hogy a nextIndex az létezik-e ha igen. akkor odaugrunk ha nem, akkor meg csökkentünk egyel!!! 
                    setIndex(i=>--i);
                } else {
                    setIndex(nextIndex) 
                }
            } else {
                setIndex(images.length-1);
            }

            nextImage.current.classList.add("right-100p");
            currentImg.current.classList.remove("prev-image-backward");
            nextImage.current.classList.remove("current-image-backward");
            setToIndex(-1);
        }, 1000);
    }

    /*
    Itt lesz majd két useEffect az egyik a direction-nek a változására, szóval ha az be lesz állítva az üres string-ről "backward" vagy 
    "forward"-ra, akkor beállítjuk a másiknak a kezdőindex-ét, hogy merre jön be majd a kép és attól föggően ez majd index-1 vagy index+1 lesz 
    és majd csinálunk egy másikat az index változására is, ha vaáltozik a sima index akkor a nextIndex-nek is változnia kell attól függően
    hogy az index-hez hozzáadtunk akkor a nextIndex-hez is hozzá kell majd adni ha meg csökkentjük, akkor ezt is csökkenteni kell majd!!!!
    ez a kettő nagyon hasonló lesz, akkár ki is lehetne tenni egy függvénybe 
    */
    useEffect(()=> {
        if(direction === "forward") {
            //itt majd meg kell nézni, hogy ha az index az kisebb mint az images.length-1 akkor mit adunk meg, amit csináltunk a forward-ba!!
            if(index < images.length-1){
                setNextIndex(index+1)
            } else {
                setNextIndex(0);
            } 
        } else if(direction === "backward") {
            if(index > 0) {
                setNextIndex(index-1);
            } else {
                setNextIndex(images.length-1);
            }
        }
    }, [index]);

    useEffect(()=> {
        if(toIndex !== -1) {
            setNextIndex(toIndex);
            return;
            //itt ugrunk oda a képre, amire szeretnénk 
        }

        if(direction === "forward") {
            if(index < images.length) {
                setNextIndex(index+1);
            } else {
                setNextIndex(0);
            }
        } else if(direction === "backward") {
            if(index > 0) {
                setNextIndex(index-1);
            } else {
                setNextIndex(images.length-1);
            }
        }
    }, [direction])

    /*
    Itt csinálunk egy useEffect-et a toIndex-re, de csak akkor ha ennek az értéke nem -1, mert akkor return van 
    és ha ez a toIndex az kisebb, mint a mi az index-ünk, akkor meghívjuk a backward és megadjuk neki ezt a toindex-et 
    ha meg nagyobb, akkor meg meghívjuk a forward-ot és megadjuk neki a toIndex-et!!! 
    és ez a toIndex, ezek majd abból fognak származni, amikor végigmegyünk egy map-val az images tömbbön!!! 
    */
    useEffect(()=> {
        if(toIndex === -1) 
            return;

        if(toIndex < index) {
            backward(toIndex)
        } else if(toIndex > index) {
            forward(toIndex);
        }
    }, [toIndex])

    return(
        <div className="img-gallery">
            <div className="title-holder" style={{top:!titleHided ? 0 : "-32px"}}>
                {images[index].title}
            </div>
            <div className="hide-show-title" style={{top:!titleHided ? "32px": "0px"}}
            onClick={()=> setTitleHided(!titleHided)}>
                <FontAwesomeIcon icon={"fa-solid " + (!titleHided ? "fa-chevron-up" : "fa-chevron-down")} />
            </div>
            <img ref={currentImg} className="pos-absolute" src={images[index].src}/>
            <img ref={nextImage} className="pos-absolute left-100p" src={images[nextIndex].src}/>

            <div className="right-icon" onClick={!disableBtns ? ()=>forward() : ()=>{}}>
                <FontAwesomeIcon icon="fa-solid fa-circle-right"/>
            </div>
            <div className="left-icon" onClick={!disableBtns ? ()=>backward() : ()=>{}}>
                <FontAwesomeIcon icon="fa-solid fa-circle-left"/>
            </div>

            <div className="img-counter" style={{width: (25*images.length) + "px"}}>
                {
                    images.map((img, i)=>
                        <div key={i} className="point"
                        onClick={()=>setToIndex(i)} style={{background:i === index ? "rgba(0,0,0,0.8)" : ""}}></div>
                    )
                }
            </div>
        </div>
    );
}

export default Gallery;

/*
fontos, hogy a nextIndex, amit vár majd a forward meg a backward az innen fog származni a map-ből és ott pedig az i lesz, mert a map-val 
mindegyik elem amin végigmegy kap majd egy index-et is (i) és ezt fogjuk majd megadni egy onClick-vel, de ha nincs onClick nem fut le ez az 
egész akkor az azt jelenti, hogy a left meg a right-icon-val váltottunk és akkor ennek az értéke -1 marad majd 
de ha viszont itt alul kattintunk rá egy point-ra, amiket csináltunk az images minden egyes elemének, akkor itt megadjuk, hogy hányadikra 
kattintunk rá és majd ezt vizsgáljuk hogyha ez kisebb mint a jelenlévő képünk index-e (index) akkor a backward fog lefutni ha meg nagyobb 
akkor meg a forward!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

fontosak még ezek a style-os dolgok, hogy -> style={{width: (25*images.length) + "px"}}>
mert ha itt kettő valami van akkor mindig kell a ()!!!!!!

vagy 
-> 
onClick={!disableBtns ? ()=>backward() : ()=>{}}>

itt meg csak akkor lehet rákattintani, illetve mindig, de csak akkor fog lefutni a backward() ha a disabledBtns az false!!!! 
hasonló van a titleHided-nél is 
->
style={{top:!titleHided ? "32px" : "0px"}}

*/