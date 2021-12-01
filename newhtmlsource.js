
const sourceHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta http-equiv="content-type" content="text/html;charset=utf-8" />
        </head>
        <body>
            <center>
                <div id="main_input">
                    <p id="question"></p>
                    <input id="submission"></input>
                    <button id="Btn" onclick="submitGuess()" hidden></button>
                    <div id="error_text"></div>
                    <p id="answer" hidden></p>
                </div>
                <select id="selection" onchange="prepSequence();">
                    <option value="present_indicitive">Present Indicitive</option>
                    <option value="present_subjunctive">Present Subjunctive</option>
                    <option value="prederite">Prederite</option>
                    <option value="imperfect">Imperfect</option>
                </select>
            <center>
    
            <script>
                const pov = ["yo", "tú", "Él, Ella, Usted", "Nosotros", "Vosostros", "Ellos, Ellas, Ustedes"]
                const tense = "present_indicitive"
                const dict = {{{!!!###!!!}}};
            </script>
    
            <script>
                const selection = document.getElementById('selection');
                const question = document.getElementById('question');
                const submission = document.getElementById('submission');
                const error_text = document.getElementById('error_text');
                const answer = document.getElementById('answer');
    
                const prepSequence = () => {
                    clearDisplay();
                    displayQuestion(selection.value);
                }

                const displayQuestion = (tense) =>{
                    const lenOfDict = Object.keys(dict).length
                    const randomValue = (min, max) =>{
                        return Math.floor(Math.random() * (max - min) + min);
                    }
    
                    const personView = pov[randomValue(0,6)]
                    const infinitive = Object.keys(dict)[randomValue(0,lenOfDict)]
                    const conjugation = dict[infinitive][tense][personView]
    
                    question.innerHTML = \`\${personView} \${infinitive}\`
                    answer.innerHTML = conjugation
                }
    
                const clearDisplay = () => {
                    question.innerHTML = "";
                    submission.value = "";
                    error_text.innerHTML = "";
                    answer.innerHTML = "";
                }
    
                const submitGuess = () => {
                    let myanswer = submission.value;
                    if (myanswer === answer.innerHTML){
                        clearDisplay();
                        displayQuestion(selection.value);
                    }else{
                        error_text.innerHTML = \`<p style="color:red;">Oops, the answer is: \${answer.innerHTML}</p>\`
                    }
                }
    
            </script>
    
            <script>
            window.onload = displayQuestion(selection.value);
    
            submission.addEventListener("keyup", (event) => {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    document.getElementById("Btn").click();
                    }
                })
            </script>
            
        </body>
    </html>
    `

module.exports = sourceHTML;