import { useEffect, useState } from "react";

function Meme() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg",
    });
    const [allMemes, setAllMemes] = useState([]);

    function getMemeImage() {
        const randomElement =
            allMemes[Math.floor(Math.random() * allMemes.length)];
        const { url } = randomElement;

        setMeme((prevState) => ({
            ...prevState,
            randomImage: url,
        }));
    }

    function handleChange(e) {
        console.log(e);
        const { value, name } = e.target;
        setMeme((prevText) => ({
            ...prevText,
            [name]: value,
        }));
    }

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then((response) => response.json())
            .then((data) => setAllMemes(data.data.memes));
    }, []);

    return (
        <main className="meme">
            <div className="form">
                <input
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button onClick={getMemeImage} className="form--button">
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme--wrapper">
                <img
                    className="meme--image"
                    src={meme.randomImage}
                    alt="Meme image"
                />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    );
}

export default Meme;
