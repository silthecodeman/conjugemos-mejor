const sourceHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta http-equiv="content-type" content="text/html;charset=utf-8" />
            <style>
                *{
                    margin: 0px;
                    padding: 0px;
                }
                body {
                    background-color: lightgreen;
                }
                .w3-input{padding:8px;display:block;border:none;border-bottom:1px solid #ccc;width:40%}
                .w3-border{border:1px solid #ccc!important}
            </style>
            <style>
                /*the container must be positioned relative:*/
                .custom-select {
                position: relative;
                font-family: Arial;
                }

                .custom-select select {
                display: none; /*hide original SELECT element:*/
                }

                .select-selected {
                background-color: DodgerBlue;
                }

                /*style the arrow inside the select element:*/
                .select-selected:after {
                position: absolute;
                content: "";
                top: 14px;
                right: 10px;
                width: 0;
                height: 0;
                border: 6px solid transparent;
                border-color: #fff transparent transparent transparent;
                }

                /*point the arrow upwards when the select box is open (active):*/
                .select-selected.select-arrow-active:after {
                border-color: transparent transparent #fff transparent;
                top: 7px;
                }

                /*style the items (options), including the selected item:*/
                .select-items div,.select-selected {
                color: #ffffff;
                padding: 8px 16px;
                border: 1px solid transparent;
                border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
                cursor: pointer;
                user-select: none;
                }

                /*style items (options):*/
                .select-items {
                position: absolute;
                background-color: DodgerBlue;
                top: 100%;
                left: 0;
                right: 0;
                z-index: 99;
                }

                /*hide the items when the select box is closed:*/
                .select-hide {
                display: none;
                }

                .select-items div:hover, .same-as-selected {
                background-color: rgba(0, 0, 0, 0.1);
                }
            </style>
        </head>
        <body>
            <br>
            <center>
                <div id="main_input">
                    <p style="font-size: 30px;" id="question"></p> <br>
                    <input id="submission" class="w3-input w3-border" name="first" type="text">
                    <button id="Btn" onclick="submitGuess()" hidden></button>
                    <div id="error_text"></div>
                    <p id="answer" hidden></p>
                </div>
                <br>
                <div class="custom-select" style="width:200px;">
                <select id="selection" onchange="prepSequence();">
                    <option value="ignore">Select a Tense</option>
                    <option value="present_indicitive">Present Indicitive</option>
                    <option value="present_subjunctive">Present Subjunctive</option>
                    <option value="prederite">Prederite</option>
                    <option value="imperfect">Imperfect</option>
                </select>
            </div>
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

                    question.innerHTML = \`\${personView}  <br><strong>\${infinitive}</strong>\`
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
            var x, i, j, l, ll, selElmnt, a, b, c;
            /*look for any elements with the class "custom-select":*/
            x = document.getElementsByClassName("custom-select");
            l = x.length;
            for (i = 0; i < l; i++) {
            selElmnt = x[i].getElementsByTagName("select")[0];
            ll = selElmnt.length;
            /*for each element, create a new DIV that will act as the selected item:*/
            a = document.createElement("DIV");
            a.setAttribute("class", "select-selected");
            a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
            x[i].appendChild(a);
            /*for each element, create a new DIV that will contain the option list:*/
            b = document.createElement("DIV");
            b.setAttribute("class", "select-items select-hide");
            for (j = 1; j < ll; j++) {
                /*for each option in the original select element,
                create a new DIV that will act as an option item:*/
                c = document.createElement("DIV");
                c.innerHTML = selElmnt.options[j].innerHTML;
                c.addEventListener("click", function(e) {
                    /*when an item is clicked, update the original select box,
                    and the selected item:*/
                    var y, i, k, s, h, sl, yl;
                    s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                    sl = s.length;
                    h = this.parentNode.previousSibling;
                    for (i = 0; i < sl; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;

                        switch (h.innerHTML){
                            case "Present Indicitive": 
                                selection.value = 'present_indicitive'
                                break;
                            case "Present Subjunctive":
                                selection.value = 'present_subjunctive'
                                break;
                            case "Prederite":
                                selection.value = 'prederite'
                                break;
                            case "Imperfect":
                                selection.value = 'imperfect'
                        }
                        prepSequence();
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        yl = y.length;
                        for (k = 0; k < yl; k++) {
                        y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                    }
                    h.click();
                });
                b.appendChild(c);
            }
            x[i].appendChild(b);
            a.addEventListener("click", function(e) {
                /*when the select box is clicked, close any other select boxes,
                and open/close the current select box:*/
                e.stopPropagation();
                closeAllSelect(this);
                this.nextSibling.classList.toggle("select-hide");
                this.classList.toggle("select-arrow-active");
                });
            }
            function closeAllSelect(elmnt) {
            /*a function that will close all select boxes in the document,
            except the current select box:*/
            var x, y, i, xl, yl, arrNo = [];
            x = document.getElementsByClassName("select-items");
            y = document.getElementsByClassName("select-selected");
            xl = x.length;
            yl = y.length;
            for (i = 0; i < yl; i++) {
                if (elmnt == y[i]) {
                arrNo.push(i)
                } else {
                y[i].classList.remove("select-arrow-active");
                }
            }
            for (i = 0; i < xl; i++) {
                if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
                }
            }
            }
            /*if the user clicks anywhere outside the select box,
            then close all select boxes:*/
            document.addEventListener("click", closeAllSelect);
            </script>

            <script>  
            window.onload = () => {
                selection.value = 'present_indicitive';
                prepSequence();
            }
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